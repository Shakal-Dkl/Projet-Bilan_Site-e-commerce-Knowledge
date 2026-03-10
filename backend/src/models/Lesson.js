const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    displayOrder: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    content: { type: String, required: true },
    videoUrl: { type: String, required: true },
    curriculumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curriculum', required: true },
    createdBy: { type: String, required: true, default: 'system' },
    updatedBy: { type: String, required: true, default: 'system' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);
