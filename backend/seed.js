require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Use environment variable for MongoDB connection
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) // Removed useCreateIndex: true and useFindAndModify: false as they are deprecated in recent Mongoose versions
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const sampleProducts = [
  {
    name: 'Sample Product 1',
    description: 'This is a sample product.',
    price: 29.99,
    image: 'https://example.com/image1.jpg',
    category: 'Electronics',
    countInStock: 10
  },
  {
    name: 'Sample Product 2',
    description: 'This is another sample product.',
    price: 39.99,
    image: 'https://example.com/image2.jpg',
    category: 'Clothing',
    countInStock: 5
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample data inserted successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB(); 