const Product = require('../models/product');
const Quotation = require('../models/quotation');
const pdfGenerator = require('../util/pdfGenerator');
const path = require('path');

exports.addProducts = async (req, res) => {
  try {
    const productsData = req.body.products.map(product => ({
      ...product,
      gst: product.rate * 0.18
    }));

    const products = await Product.insertMany(productsData);

    const quotation = new Quotation({
      userId: req.user.id,
      products: products.map(product => product._id),
      date: new Date()
    });
    const directoryPath = path.join('D:', 'moneeflo', 'moneefloTest','invoices');
    const pdfPath = path.join(directoryPath, `invoice-${quotation._id}.pdf`);
    pdfGenerator.generatePDF(quotation, products, pdfPath);

    quotation.pdfPath = pdfPath;
    await quotation.save();

    res.status(201).json({ message: 'Products added and invoice generated', pdfPath });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};
