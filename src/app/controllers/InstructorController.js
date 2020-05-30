import { Op } from 'sequelize';

import Course from '../models/Course';
import File from '../models/File';
import User from '../models/User';

class InstructorController {
  async index(req, res) {
    const {
      currentPage = 0,
      perPage = 10,
      search = '',
      showAll = false,
    } = req.query;

    let courses = [];

    if (showAll) {
      courses = await Course.findAll({
        where: { provider_id: req.userId, title: { [Op.like]: `%${search}%` } },
        include: [
          { model: File, as: 'image', attributes: ['id', 'path', 'url'] },
          { model: File, as: 'video', attributes: ['id', 'path', 'url'] },
          { model: User, as: 'intructor', attributes: ['id', 'name', 'email'] },
        ],
        order: [['createdAt']],
      });
    } else {
      courses = await Course.findAll({
        where: { provider_id: req.userId, title: { [Op.like]: `%${search}%` } },
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
    const { id } = req.params;

    const course = await Course.findById(id);

    return res.json(course);
  }
}

export default new InstructorController();
