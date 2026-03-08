const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Curriculum = sequelize.define('Curriculum', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    themeId: { type: DataTypes.INTEGER, allowNull: false },
    createdBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' },
    updatedBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' }
  }, {
    tableName: 'curriculums',
    underscored: true,
    timestamps: true
  });

  return Curriculum;
};
