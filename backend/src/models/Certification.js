const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
    title: { type: String, required: true },
    issuedAt: { type: Date, required: true, default: Date.now },
    createdBy: { type: String, required: true, default: 'system' },
    updatedBy: { type: String, required: true, default: 'system' }
  },
  {
    timestamps: true
  }
);

certificationSchema.index({ userId: 1, themeId: 1 }, { unique: true });

module.exports = mongoose.models.Certification || mongoose.model('Certification', certificationSchema);
