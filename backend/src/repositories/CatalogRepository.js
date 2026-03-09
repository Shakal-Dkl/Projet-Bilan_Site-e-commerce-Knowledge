const { Theme, Curriculum, Lesson } = require('../models');

class CatalogRepository {
  async getThemesWithCatalog() {
    return Theme.findAll({
      include: [{ model: Curriculum, include: [Lesson] }],
      order: [
        ['displayOrder', 'ASC'],
        [{ model: Curriculum }, 'displayOrder', 'ASC'],
        [{ model: Curriculum }, { model: Lesson }, 'displayOrder', 'ASC']
      ]
    });
  }

  async getCurriculumById(id) {
    return Curriculum.findByPk(id, {
      include: [Lesson, Theme],
      order: [[Lesson, 'displayOrder', 'ASC']]
    });
  }

  async getLessonById(id) {
    return Lesson.findByPk(id, {
      include: [{ model: Curriculum, include: [Theme, Lesson] }],
      order: [[Curriculum, Lesson, 'displayOrder', 'ASC']]
    });
  }
}

module.exports = new CatalogRepository();
