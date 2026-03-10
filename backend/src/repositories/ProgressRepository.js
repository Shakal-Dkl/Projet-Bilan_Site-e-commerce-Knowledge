const { LessonProgress, Lesson, Curriculum, Theme, Certification } = require('../models');

function toId(value) {
  return value ? String(value) : null;
}

class ProgressRepository {
  async upsertLessonProgress(userId, lessonId) {
    let progress = await LessonProgress.findOne({ userId, lessonId });

    if (!progress) {
      progress = await LessonProgress.create({
        userId,
        lessonId,
        isValidated: true,
        validatedAt: new Date()
      });
      return progress;
    }

    if (!progress.isValidated) {
      progress.isValidated = true;
      progress.validatedAt = new Date();
      await progress.save();
    }

    return progress;
  }

  async getValidatedLessonIds(userId) {
    const rows = await LessonProgress.find({ userId, isValidated: true }).lean();
    return rows.map((row) => toId(row.lessonId));
  }

  async getCurriculumLessonIds(curriculumId) {
    const lessons = await Lesson.find({ curriculumId }).lean();
    return lessons.map((lesson) => toId(lesson._id));
  }

  async getThemeLessonIds(themeId) {
    const curriculums = await Curriculum.find({ themeId }).select('_id').lean();
    const curriculumIds = curriculums.map((curriculum) => curriculum._id);
    const lessons = await Lesson.find({ curriculumId: { $in: curriculumIds } }).select('_id').lean();
    return lessons.map((lesson) => toId(lesson._id));
  }

  async findCertification(userId, themeId) {
    return Certification.findOne({ userId, themeId });
  }

  async createCertification(userId, themeId, title) {
    return Certification.create({ userId, themeId, title });
  }

  async listCertificationsByUser(userId) {
    const certifications = await Certification.find({ userId }).sort({ issuedAt: -1 }).lean();
    const themeIds = certifications.map((item) => item.themeId);
    const themes = await Theme.find({ _id: { $in: themeIds } }).lean();
    const themeById = new Map(themes.map((item) => [toId(item._id), { ...item, id: toId(item._id) }]));

    return certifications.map((certification) => ({
      ...certification,
      id: toId(certification._id),
      userId: toId(certification.userId),
      themeId: toId(certification.themeId),
      Theme: themeById.get(toId(certification.themeId)) || null
    }));
  }
}

module.exports = new ProgressRepository();
