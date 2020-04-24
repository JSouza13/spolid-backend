import crypto from 'crypto';
import { addHours } from 'date-fns';
import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import ForgotPasswordMail from '../jobs/ForgotPasswordMail';
// import WelcomeMail from '../jobs/WelcomeMail';
import File from '../models/File';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'E-mail de usuário já cadastrado.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    // await Queue.add(WelcomeMail.key, { name, email });

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, oldPassword, password, confirmPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ error: 'Confirmação de nova senha inválida' });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'E-mail de usuário já cadastrado.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha antiga não é confere' });
    }

    await user.update(req.body);

    const { id, name, email: NewEmail, avatar } = await User.findByPk(
      req.userId,
      {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      }
    );

    return res.json({
      id,
      name,
      email: NewEmail,
      avatar,
    });
  }

  async forgot_password(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: 'E-mail não cadastrado' });
    }

    const tokenTemp = crypto.randomBytes(20).toString('hex');
    const now = addHours(new Date(), 48);

    await User.update(
      {
        password_reset_token: tokenTemp,
        password_reset_expires: now,
      },
      {
        where: { email },
      }
    );

    await Queue.add(ForgotPasswordMail.key, { user, email, tokenTemp });

    return res.status(200).send(`E-mail enviado para ${user.name} <${email}>`);
  }

  async reset_password(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    const { tokenTemp, password, confirmPassword } = req.body;

    if (confirmPassword !== password) {
      return res.status(400).json({ error: 'As senhas devem ser iguais' });
    }

    const user = await User.findOne({
      where: { password_reset_token: tokenTemp },
    });

    if (tokenTemp !== user.password_reset_token)
      return res.status(400).send({ error: 'Token inválido' });

    const now = new Date();

    if (now > user.password_reset_expires)
      return res.status(400).send({ error: 'Token expirado, gere um novo' });

    user.password = password;

    await user.update(req.body);

    return res.status(200).json();
  }
}

export default new UserController();
