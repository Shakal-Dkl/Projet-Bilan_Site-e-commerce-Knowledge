const sequelize = require('../config/database');
const UserModel = require('./User');
const ThemeModel = require('./Theme');
const CurriculumModel = require('./Curriculum');
const LessonModel = require('./Lesson');
const PurchaseModel = require('./Purchase');
const LessonProgressModel = require('./LessonProgress');
const CertificationModel = require('./Certification');

// EN: Model registration in one place.
// FR: Enregistrement centralisé des modèles.
const User = UserModel(sequelize);
const Theme = ThemeModel(sequelize);
const Curriculum = CurriculumModel(sequelize);
const Lesson = LessonModel(sequelize);
const Purchase = PurchaseModel(sequelize);
const LessonProgress = LessonProgressModel(sequelize);
const Certification = CertificationModel(sequelize);

// EN: Catalog hierarchy -> Theme > Curriculum > Lesson.
// FR: Hiérarchie catalogue -> Thème > Cursus > Leçon.
Theme.hasMany(Curriculum, { foreignKey: 'themeId' });
Curriculum.belongsTo(Theme, { foreignKey: 'themeId' });

Curriculum.hasMany(Lesson, { foreignKey: 'curriculumId' });
Lesson.belongsTo(Curriculum, { foreignKey: 'curriculumId' });

// EN: Commerce links -> who bought what.
// FR: Liens e-commerce -> qui a acheté quoi.
User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });
Purchase.belongsTo(Curriculum, { foreignKey: 'curriculumId' });
Purchase.belongsTo(Lesson, { foreignKey: 'lessonId' });

// EN: Learning progress links.
// FR: Liens de progression pédagogique.
User.hasMany(LessonProgress, { foreignKey: 'userId' });
LessonProgress.belongsTo(User, { foreignKey: 'userId' });
LessonProgress.belongsTo(Lesson, { foreignKey: 'lessonId' });

// EN: Certifications earned per theme and user.
// FR: Certifications obtenues par thème et utilisateur.
User.hasMany(Certification, { foreignKey: 'userId' });
Certification.belongsTo(User, { foreignKey: 'userId' });
Certification.belongsTo(Theme, { foreignKey: 'themeId' });

module.exports = {
  sequelize,
  User,
  Theme,
  Curriculum,
  Lesson,
  Purchase,
  LessonProgress,
  Certification
};
