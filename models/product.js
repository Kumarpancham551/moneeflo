const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  gst: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
