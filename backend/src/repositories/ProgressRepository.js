const { LessonProgress, Lesson, Curriculum, Theme, Certification } = require('../models');

class ProgressRepository {
  async upsertLessonProgress(userId, lessonId) {
    const [progress] = await LessonProgress.findOrCreate({
      where: { userId, lessonId },
      defaults: { userId, lessonId, isValidated: true, validatedAt: new Date() }
    });

    if (!progress.isValidated) {
      progress.isValidated = true;
      progress.validatedAt = new Date();
      await progress.save();
    }

    return progress;
  }

  async getValidatedLessonIds(userId) {
    const rows = await LessonProgress.findAll({ where: { userId, isValidated: true } });
    return rows.map((row) => row.lessonId);
  }

  async getCurriculumLessonIds(curriculumId) {
    const lessons = await Lesson.findAll({ where: { curriculumId } });
    return lessons.map((lesson) => lesson.id);
  }

  async getThemeLessonIds(themeId) {
    const lessons = await Lesson.findAll({
      include: [{ model: Curriculum, where: { themeId }, include: [Theme] }]
    });
    return lessons.map((lesson) => lesson.id);
  }

  async findCertification(userId, themeId) {
    return Certification.findOne({ where: { userId, themeId } });
  }

  async createCertification(userId, themeId, title) {
    return Certification.create({ userId, themeId, title });
  }

  async listCertificationsByUser(userId) {
    return Certification.findAll({ where: { userId }, include: [Theme], order: [['issuedAt', 'DESC']] });
  }
}

module.exports = new ProgressRepository();
