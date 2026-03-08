const progressRepository = require('../repositories/ProgressRepository');
const catalogRepository = require('../repositories/CatalogRepository');
const purchaseService = require('./PurchaseService');

class ProgressService {
  async validateLesson(user, lessonId) {
    const lesson = await catalogRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const canAccess = await purchaseService.canAccessLesson(user.id, lesson);
    if (!canAccess) {
      throw new Error('Lesson not purchased');
    }

    await progressRepository.upsertLessonProgress(user.id, lesson.id);

    const validatedIds = await progressRepository.getValidatedLessonIds(user.id);
    const curriculumLessonIds = await progressRepository.getCurriculumLessonIds(lesson.curriculumId);
    const curriculumValidated = curriculumLessonIds.every((id) => validatedIds.includes(id));

    const themeId = lesson.Curriculum.themeId;
    const themeLessonIds = await progressRepository.getThemeLessonIds(themeId);
    const themeValidated = themeLessonIds.length > 0 && themeLessonIds.every((id) => validatedIds.includes(id));

    let certification = null;
    if (themeValidated) {
      const existing = await progressRepository.findCertification(user.id, themeId);
      if (!existing) {
        certification = await progressRepository.createCertification(
          user.id,
          themeId,
          `Knowledge Learning - ${lesson.Curriculum.Theme.name}`
        );
      }
    }

    return {
      lessonValidated: true,
      curriculumValidated,
      certificationIssued: Boolean(certification)
    };
  }

  async listUserCertifications(userId) {
    return progressRepository.listCertificationsByUser(userId);
  }
}

module.exports = new ProgressService();
