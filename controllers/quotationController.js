const Quotation = require('../models/quotation');

exports.viewQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({ userId: req.user.id }).populate('products');
    res.status(200).json(quotations);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
