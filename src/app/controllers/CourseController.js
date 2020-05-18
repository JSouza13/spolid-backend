import * as Yup from 'yup';

import Course from '../models/Course';
import User from '../models/User';

class CourseController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.number().required(),
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
