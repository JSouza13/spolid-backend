import * as Yup from 'yup';

import Course from '../models/Course';
import Lesson from '../models/Lesson';
import User from '../models/User';

class LessonController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .max(30, 'O Título precisa ter no máximo 30 caracteres')
        .required('Título deve ser informado'),
      video_url: Yup.string().required('Descrição deve ser informada'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { title, video_url } = req.body;

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

    const checkInstructor = await Course.findOne({
      where: {
        id: req.params.id,
        provider_id: req.userId,
      },
    });
    if (!checkInstructor) {
      return res
        .status(401)
        .json({ error: 'É preciso ser o proprietário do curso' });
    }

    const lesson = await Lesson.create({
      course_id: req.params.id,
      title,
      video_url,
    });

    return res.json(lesson);
  }
}

export default new LessonController();
