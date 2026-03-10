const { Theme, Curriculum, Lesson } = require('../models');

function toId(value) {
  return value ? String(value) : null;
}

function formatLesson(lesson) {
  return {
    ...lesson,
    id: toId(lesson._id),
    curriculumId: toId(lesson.curriculumId)
  };
}

function formatCurriculum(curriculum, lessons = [], theme = null) {
  return {
    ...curriculum,
    id: toId(curriculum._id),
    themeId: toId(curriculum.themeId),
    Lessons: lessons.map(formatLesson),
    Theme: theme
      ? {
          ...theme,
          id: toId(theme._id)
        }
      : undefined
  };
}

class CatalogRepository {
  async getThemesWithCatalog() {
    const themes = await Theme.find().sort({ displayOrder: 1 }).lean();

    const result = [];
    for (const theme of themes) {
      const curriculums = await Curriculum.find({ themeId: theme._id }).sort({ displayOrder: 1 }).lean();
      const formattedCurriculums = [];

      for (const curriculum of curriculums) {
        const lessons = await Lesson.find({ curriculumId: curriculum._id }).sort({ displayOrder: 1 }).lean();
        formattedCurriculums.push(formatCurriculum(curriculum, lessons));
      }

      result.push({
        ...theme,
        id: toId(theme._id),
        Curriculums: formattedCurriculums
      });
    }

    return result;
  }

  async getCurriculumById(id) {
    const curriculum = await Curriculum.findById(id).lean();
    if (!curriculum) {
      return null;
    }

    const [theme, lessons] = await Promise.all([
      Theme.findById(curriculum.themeId).lean(),
      Lesson.find({ curriculumId: curriculum._id }).sort({ displayOrder: 1 }).lean()
    ]);

    return formatCurriculum(curriculum, lessons, theme);
  }

  async getLessonById(id) {
    const lesson = await Lesson.findById(id).lean();
    if (!lesson) {
      return null;
    }

    const curriculum = await Curriculum.findById(lesson.curriculumId).lean();
    if (!curriculum) {
      return formatLesson(lesson);
    }

    const [theme, curriculumLessons] = await Promise.all([
      Theme.findById(curriculum.themeId).lean(),
      Lesson.find({ curriculumId: curriculum._id }).sort({ displayOrder: 1 }).lean()
    ]);

    return {
      ...formatLesson(lesson),
      Curriculum: formatCurriculum(curriculum, curriculumLessons, theme)
    };
  }
}

module.exports = new CatalogRepository();
