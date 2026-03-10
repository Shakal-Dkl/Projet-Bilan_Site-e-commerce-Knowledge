const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    displayOrder: { type: Number, required: true, default: 1 },
    createdBy: { type: String, required: true, default: 'system' },
    updatedBy: { type: String, required: true, default: 'system' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Theme || mongoose.model('Theme', themeSchema);
