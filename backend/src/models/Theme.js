const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Theme = sequelize.define('Theme', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    createdBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' },
    updatedBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' }
  }, {
    tableName: 'themes',
    underscored: true,
    timestamps: true
  });

  return Theme;
};
