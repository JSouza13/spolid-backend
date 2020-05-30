import 'dotenv/config';
import { subDays } from 'date-fns';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import File from '../models/File';
import User from '../models/User';

class SeesionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incompatível' });
    }

    const now = new Date();

    if (subDays(now, 1) > user.last_login) {
      await user.update({
        last_login: now,
        points_cash: (user.points_cash += 50),
      });
    } else {
      await user.update({
        last_login: now,
      });
    }

    const { id, name, avatar, provider, points_cash, last_login } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
        points_cash,
        last_login,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SeesionController();
