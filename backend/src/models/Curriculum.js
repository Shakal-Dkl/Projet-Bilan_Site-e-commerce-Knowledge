const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    displayOrder: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    description: { type: String, default: null },
    themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
    createdBy: { type: String, required: true, default: 'system' },
    updatedBy: { type: String, required: true, default: 'system' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Curriculum || mongoose.model('Curriculum', curriculumSchema);
