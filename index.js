const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

 const authRoutes = require('./routes/auth');
 const productRoutes = require('./routes/products');
 const quotationRoutes = require('./routes/quotations');

const app = express();

app.use(bodyParser.json());

 app.use('/auth', authRoutes);
 app.use('/products', productRoutes);
 app.use('/quotations', quotationRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
