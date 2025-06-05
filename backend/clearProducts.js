const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const clearProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cartmax');
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('All products cleared from database');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

clearProducts(); 