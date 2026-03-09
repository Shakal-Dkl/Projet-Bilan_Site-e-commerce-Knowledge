const progressRepository = require('../repositories/ProgressRepository');
const catalogRepository = require('../repositories/CatalogRepository');
const purchaseService = require('./PurchaseService');

class ProgressService {
  async validateLesson(user, lessonId) {
    // EN: Step 1 - Lesson must exist.
    // FR: Étape 1 - La leçon doit exister.
    const lesson = await catalogRepository.getLessonById(lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // EN: Step 2 - User must have rights to access this lesson.
    // FR: Étape 2 - L'utilisateur doit avoir les droits d'accès à cette leçon.
    const canAccess = await purchaseService.canAccessLesson(user.id, lesson);
    if (!canAccess) {
      throw new Error('Lesson not purchased');
    }

    // EN: Step 3 - Mark lesson as validated.
    // FR: Étape 3 - Marquer la leçon comme validée.
    await progressRepository.upsertLessonProgress(user.id, lesson.id);

    // EN: Step 4 - Compute curriculum completion status.
    // FR: Étape 4 - Calculer l'état de validation du cursus.
    const validatedIds = await progressRepository.getValidatedLessonIds(user.id);
    const curriculumLessonIds = await progressRepository.getCurriculumLessonIds(lesson.curriculumId);
    const curriculumValidated = curriculumLessonIds.every((id) => validatedIds.includes(id));

    // EN: Step 5 - Compute theme completion for certification.
    // FR: Étape 5 - Calculer la validation du thème pour la certification.
    const themeId = lesson.Curriculum.themeId;
    const themeLessonIds = await progressRepository.getThemeLessonIds(themeId);
    const themeValidated = themeLessonIds.length > 0 && themeLessonIds.every((id) => validatedIds.includes(id));

    let certification = null;
    if (themeValidated) {
      // EN: Create certification only once per user/theme.
      // FR: Crée la certification une seule fois par utilisateur/thème.
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
