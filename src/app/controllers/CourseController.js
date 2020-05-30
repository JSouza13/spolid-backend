import { Op } from 'sequelize';
import * as Yup from 'yup';

import Course from '../models/Course';
import File from '../models/File';
import User from '../models/User';

class CourseController {
  async index(req, res) {
    const {
      currentPage = 1,
      perPage = 10,
      search = '',
      showAll = false,
    } = req.query;

    let courses = [];

    if (showAll) {
      courses = await Course.findAll({
        where: { title: { [Op.like]: `%${search}%` } },
        include: [
          { model: File, as: 'image', attributes: ['id', 'path', 'url'] },
          { model: File, as: 'video', attributes: ['id', 'path', 'url'] },
          { model: User, as: 'intructor', attributes: ['id', 'name', 'email'] },
        ],
        order: [['createdAt']],
      });
    } else {
      courses = await Course.findAll({
        where: { title: { [Op.like]: `%${search}%` } },
        include: [
          { model: File, as: 'image', attributes: ['id', 'path', 'url'] },
          { model: File, as: 'video', attributes: ['id', 'path', 'url'] },
          { model: User, as: 'intructor', attributes: ['id', 'name', 'email'] },
        ],
        order: [['createdAt']],
        limit: perPage,
        offset: (currentPage - 1) * perPage,
      });
    }

    res.json(courses);
  }

  async show(req, res) {
    const course = await Course.findOne({
      where: { id: req.params.id },
      include: [
        { model: File, as: 'image', attributes: ['id', 'path', 'url'] },
        { model: File, as: 'video', attributes: ['id', 'path', 'url'] },
        { model: User, as: 'intructor', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!course) {
      return res.status(400).json({ error: 'Curso não cadastrado' });
    }

    return res.json(course);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .max(30, 'O Título precisa ter no máximo 30 caracteres')
        .required('Título deve ser informado'),
      description: Yup.string()
        .max(300, 'A descrição pode ter no máximo 300 caracteres')
        .required('Descrição deve ser informada'),
      value: Yup.string().required('Preço deve ser informado'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { title, description, value, image_id, video_id } = req.body;

    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'É preciso ser um Instrutor para criar cursos' });
    }

    const course = await Course.create({
      provider_id: req.userId,
      title,
      description,
      value,
      image_id,
      video_id,
    });

    return res.json(course);
  }
}

export default new CourseController();
