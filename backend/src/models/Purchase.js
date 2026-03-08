const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Purchase = sequelize.define('Purchase', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    curriculumId: { type: DataTypes.INTEGER, allowNull: true },
    lessonId: { type: DataTypes.INTEGER, allowNull: true },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    paymentProvider: { type: DataTypes.STRING, allowNull: false, defaultValue: 'sandbox' },
    paymentStatus: { type: DataTypes.STRING, allowNull: false, defaultValue: 'paid' },
    transactionRef: { type: DataTypes.STRING, allowNull: false, unique: true },
    createdBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' },
    updatedBy: { type: DataTypes.STRING, allowNull: false, defaultValue: 'system' }
  }, {
    tableName: 'purchases',
    underscored: true,
    timestamps: true
  });

  return Purchase;
};
