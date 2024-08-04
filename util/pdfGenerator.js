const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');


exports.generatePDF = async (quotation, products, pdfPath) => {
  const dir = path.dirname(pdfPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
const content = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .invoice-container { width: 100%; max-width: 800px; margin: auto; padding: 20px; }
    .invoice-title { text-align: center; font-size: 25px; margin-bottom: 20px; }
    body {
            font-family: Arial, sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
             border-bottom: 1px solid #f1f1f1;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            border-bottom: 1px solid #ddd;
        }
     .total-container {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
    .total-section {
            width: 300px; /* Adjust the width as needed */
            margin-top: 20px;
        }
        .total-section td {
            padding: 10px;
            text-align: left;
        }
        .total-section .label {
            font-weight: bold;
        }
        .total-section .value {
            text-align: right;
        }
        .grand-total {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
        }
            .grand-total .label {
            font-weight: bold;
        }
        .grand-total .value {
            color: #0000ff;
        }
    .terms { margin-top: 40px; background-color: #0e0e0e; border-radius: 50px; border: 1px solid #ddd; padding: 10px; }
    .terms p { font-size: 12px; text-align: left; color: #f2f2f2; }
    .footer { margin-top: 20px; text-align: left; font-size: 12px; }
  </style>
</head>
<body>
  <div class="invoice-container">
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${products.map(product => `
                <tr>
                    <td>${product.name}</td>
                    <td><a href="#">${product.qty}</a></td>
                    <td>${product.rate}</td>
                    <td>INR ${product.rate * product.qty}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    <div class="total-container">
        <table class="total-section">
            <tr>
                <td class="label">Total</td>
                <td class="value">INR ${products.reduce((sum, product) => sum + product.rate * product.qty, 0)}</td>
            </tr>
            <tr>
                <td class="label">GST</td>
                <td class="value">18%</td>
            </tr>
            <tr class="grand-total">
                <td class="label">Grand Total</td>
                <td class="value">₹ ${(products.reduce((sum, product) => sum + product.rate * product.qty, 0) * 1.18).toFixed(2)}</td>
            </tr>
        </table>
    </div>
    <div class="footer">
      Valid until: 12/04/2024
    </div>
    <div class="terms">
      <p>Terms and Conditions</p>
      <p>We are happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention.</p>
    </div>
  </div>
</body>
</html>`
  await page.setContent(content, { waitUntil: 'networkidle0' });
  await page.pdf({ path: pdfPath, format: 'A4' });

  await browser.close();
};
