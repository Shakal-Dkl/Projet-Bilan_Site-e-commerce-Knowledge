const catalogRepository = require('../repositories/CatalogRepository');

class CatalogService {
  async getCatalog() {
    return catalogRepository.getThemesWithCatalog();
  }

  async getCurriculum(id) {
    const curriculum = await catalogRepository.getCurriculumById(id);
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }
    return curriculum;
  }

  async getLesson(id) {
    const lesson = await catalogRepository.getLessonById(id);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    return lesson;
  }
}

module.exports = new CatalogService();
