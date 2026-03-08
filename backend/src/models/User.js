const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'client', 'other'), allowNull: false, defaultValue: 'client' },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    activationToken: { type: DataTypes.STRING, allowNull: true, unique: true },
    createdBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' },
    updatedBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' }
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true
  });

  return User;
};
