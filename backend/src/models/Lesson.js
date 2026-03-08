const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Lesson = sequelize.define('Lesson', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    videoUrl: { type: DataTypes.STRING, allowNull: false },
    curriculumId: { type: DataTypes.INTEGER, allowNull: false },
    createdBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' },
    updatedBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' }
  }, {
    tableName: 'lessons',
    underscored: true,
    timestamps: true
  });

  return Lesson;
};
