const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const LessonProgress = sequelize.define('LessonProgress', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    lessonId: { type: DataTypes.INTEGER, allowNull: false },
    isValidated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    validatedAt: { type: DataTypes.DATE, allowNull: true },
    createdBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' },
    updatedBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' }
  }, {
    tableName: 'lesson_progress',
    underscored: true,
    timestamps: true,
    indexes: [{ unique: true, fields: ['user_id', 'lesson_id'] }]
  });

  return LessonProgress;
};
