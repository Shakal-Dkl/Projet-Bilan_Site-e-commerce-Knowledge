const { Theme, Curriculum, Lesson } = require('../models');

class CatalogRepository {
  async getThemesWithCatalog() {
    return Theme.findAll({
      include: [{ model: Curriculum, include: [Lesson] }],
      order: [['name', 'ASC']]
    });
  }

  async getCurriculumById(id) {
    return Curriculum.findByPk(id, { include: [Lesson, Theme] });
  }

  async getLessonById(id) {
    return Lesson.findByPk(id, { include: [{ model: Curriculum, include: [Theme, Lesson] }] });
  }
}

module.exports = new CatalogRepository();
