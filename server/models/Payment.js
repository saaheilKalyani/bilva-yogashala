const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  amount: { type: Number, required: true },
  couponCode: { type: String },
  discount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  invoiceUrl: { type: String },
  month: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
