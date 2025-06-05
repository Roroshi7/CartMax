const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Product = require('./models/Product');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cartmax')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize products if none exist
const initializeProducts = async () => {
  try {
    console.log('Checking for existing products...');
    const count = await Product.countDocuments();
    console.log('Current product count:', count);
    
    if (count === 0) {
      console.log('No products found, initializing...');
      const products = [
        // Electronics
        {
          name: 'Premium Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
          category: 'Electronics',
          countInStock: 10
        },
        {
          name: 'Smart Watch',
          description: 'Feature-rich smartwatch with health monitoring',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
          category: 'Electronics',
          countInStock: 15
        },
        {
          name: 'Wireless Earbuds',
          description: 'True wireless earbuds with premium sound quality',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
          category: 'Electronics',
          countInStock: 20
        },
        {
          name: 'Gaming Mouse',
          description: 'High-precision gaming mouse with RGB lighting',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
          category: 'Electronics',
          countInStock: 25
        },
        {
          name: 'Mechanical Keyboard',
          description: 'Mechanical gaming keyboard with customizable keys',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
          category: 'Electronics',
          countInStock: 12
        },
        {
          name: '4K Monitor',
          description: 'Ultra-wide 4K monitor with HDR support',
          price: 399.99,
          image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
          category: 'Electronics',
          countInStock: 8
        },
        // Clothing
        {
          name: 'Classic Denim Jacket',
          description: 'Timeless denim jacket with modern fit',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
          category: 'Clothing',
          countInStock: 30
        },
        {
          name: 'Premium Cotton T-Shirt',
          description: 'Soft and comfortable cotton t-shirt',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
          category: 'Clothing',
          countInStock: 50
        },
        {
          name: 'Designer Sneakers',
          description: 'Stylish and comfortable sneakers',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          category: 'Clothing',
          countInStock: 20
        },
        // Home & Kitchen
        {
          name: 'Smart Coffee Maker',
          description: 'Programmable coffee maker with app control',
          price: 149.99,
          image: 'https://discounttoday.net/wp-content/uploads/2022/06/96-3.jpg',
          category: 'Home & Kitchen',
          countInStock: 15
        },
        {
          name: 'Stainless Steel Cookware Set',
          description: '10-piece professional cookware set',
          price: 299.99,
          image: 'https://i5.walmartimages.com/asr/470569ed-21b1-4315-b7f1-8ff283156746.02d16122ed760fde073e3cb3ddc22455.jpeg',
          category: 'Home & Kitchen',
          countInStock: 10
        },
        // Books
        {
          name: 'Bestselling Novel',
          description: 'Award-winning fiction novel',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
          category: 'Books',
          countInStock: 100
        },
        {
          name: 'Cookbook Collection',
          description: 'Complete set of gourmet recipes',
          price: 49.99,
          image: 'https://i2.wp.com/acookbookcollection.com/wp-content/uploads/2017/05/A-Cookbook-Collection-4.jpg?fit=1225%2C1061',
          category: 'Books',
          countInStock: 25
        },
        // Sports
        {
          name: 'Professional Yoga Mat',
          description: 'Non-slip yoga mat with carrying strap',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500',
          category: 'Sports',
          countInStock: 40
        },
        {
          name: 'Fitness Tracker',
          description: 'Advanced fitness tracking with heart rate monitor',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500',
          category: 'Sports',
          countInStock: 30
        },
        // Beauty
        {
          name: 'Luxury Skincare Set',
          description: 'Complete skincare routine set',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500',
          category: 'Beauty',
          countInStock: 20
        },
        {
          name: 'Professional Makeup Kit',
          description: 'Complete makeup collection for professionals',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
          category: 'Beauty',
          countInStock: 15
        },
        // Toys
        {
          name: 'Educational Robot Kit',
          description: 'STEM learning robot for kids',
          price: 79.99,
          image: 'https://tse2.mm.bing.net/th/id/OIP.L5jSj73dYkMp1QKCES-sPwHaFP?rs=1&pid=ImgDetMain',
          category: 'Toys',
          countInStock: 25
        },
        {
          name: 'Building Blocks Set',
          description: 'Creative building blocks for all ages',
          price: 49.99,
          image: 'https://i5.walmartimages.com/asr/8b847524-a5bc-4b46-88d6-d57199e20ed7_1.2653156a0cc3ae2a7e93655f63a48759.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
          category: 'Toys',
          countInStock: 35
        },
        // More Electronics
        {
          name: 'Bluetooth Speaker',
          description: 'Portable waterproof bluetooth speaker',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
          category: 'Electronics',
          countInStock: 20
        },
        {
          name: 'Tablet Pro',
          description: 'High-performance tablet with stylus',
          price: 499.99,
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
          category: 'Electronics',
          countInStock: 10
        },
        // More Clothing
        {
          name: 'Winter Parka',
          description: 'Warm and stylish winter jacket',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
          category: 'Clothing',
          countInStock: 15
        },
        {
          name: 'Designer Handbag',
          description: 'Luxury leather handbag',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
          category: 'Clothing',
          countInStock: 8
        },
        // More Home & Kitchen
        {
          name: 'Smart Home Hub',
          description: 'Control your home with voice commands',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500',
          category: 'Home & Kitchen',
          countInStock: 12
        },
        {
          name: 'Robot Vacuum',
          description: 'Smart robot vacuum with app control',
          price: 299.99,
          image: 'https://th.bing.com/th/id/OIP.A95oCyj8yKGfKbnCh3TZJgHaHF?rs=1&pid=ImgDetMain',
          category: 'Home & Kitchen',
          countInStock: 10
        },
        // More Books
        {
          name: 'Business Strategy Book',
          description: 'Best-selling business guide',
          price: 24.99,
          image: 'https://th.bing.com/th/id/OIP.EIMGApj8hxv6RFhtnRoRHgHaK1?w=206&h=302&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          category: 'Books',
          countInStock: 60
        },
        {
          name: 'Photography Guide',
          description: 'Complete guide to digital photography',
          price: 34.99,
          image: 'https://th.bing.com/th/id/OIP.wLu7eXWIVjGZnEO0ywhM2gHaI8?w=161&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          category: 'Books',
          countInStock: 40
        },
        // More Sports
        {
          name: 'Basketball',
          description: 'Professional indoor/outdoor basketball',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500',
          category: 'Sports',
          countInStock: 50
        },
        {
          name: 'Tennis Racket',
          description: 'Professional tennis racket with case',
          price: 89.99,
          image: 'https://3.bp.blogspot.com/-mJ1xF5xuVvI/WLp_nBJrP0I/AAAAAAAAACA/r0tGP1z9tY4kLO3w2KMsLkHd1wSgv_LUgCLcB/s1600/Babolat%2BAeropro%2BDrive%2BGT%2BUnstrung%2BTennis%2BRacquet.jpg',
          category: 'Sports',
          countInStock: 25
        },
        // More Beauty
        {
          name: 'Hair Dryer',
          description: 'Professional ionic hair dryer',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500',
          category: 'Beauty',
          countInStock: 30
        },
        {
          name: 'Perfume Set',
          description: 'Luxury perfume collection',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
          category: 'Beauty',
          countInStock: 20
        },
        // More Toys
        {
          name: 'Remote Control Car',
          description: 'High-speed RC car with controller',
          price: 69.99,
          image: 'https://m.media-amazon.com/images/I/81ap+We87nL.jpg',
          category: 'Toys',
          countInStock: 20
        },
        {
          name: 'Science Kit',
          description: 'Educational science experiments kit',
          price: 39.99,
          image: 'https://tse4.mm.bing.net/th/id/OIP.ip6z2tDIjggJyqF1FImPgAHaHa?rs=1&pid=ImgDetMain',
          category: 'Toys',
          countInStock: 30
        },
        {
          name: 'Air Purifier',
          description: 'HEPA air purifier for clean indoor air',
          price: 199.99,
          image: 'https://i5.walmartimages.com/asr/60eb9e3f-5d5d-4306-bdc1-91ab7729a09d.8b95fc2d3f2ee96ea70df58ae9ae9178.jpeg',
          category: 'Home & Kitchen',
          countInStock: 15
        }
      ];

      const result = await Product.insertMany(products);
      console.log('Products initialized successfully:', result.length, 'products added');
    } else {
      console.log('Products already exist in database');
    }
  } catch (error) {
    console.error('Error initializing products:', error);
  }
};

// Initialize products
initializeProducts();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 