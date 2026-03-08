const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Certification = sequelize.define('Certification', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    themeId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    issuedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    createdBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' },
    updatedBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' }
  }, {
    tableName: 'certifications',
    underscored: true,
    timestamps: true,
    indexes: [{ unique: true, fields: ['user_id', 'theme_id'] }]
  });

  return Certification;
};
