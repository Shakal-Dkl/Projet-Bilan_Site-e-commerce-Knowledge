const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    curriculumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curriculum', default: null },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', default: null },
    amount: { type: Number, required: true },
    paymentProvider: { type: String, required: true, default: 'sandbox' },
    paymentStatus: { type: String, required: true, default: 'paid' },
    transactionRef: { type: String, required: true, unique: true },
    createdBy: { type: String, required: true, default: 'system' },
    updatedBy: { type: String, required: true, default: 'system' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);
