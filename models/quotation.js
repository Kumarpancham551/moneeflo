const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  date: { type: Date, default: Date.now },
  pdfPath: { type: String, required: true }
});

module.exports = mongoose.model('Quotation', quotationSchema);
