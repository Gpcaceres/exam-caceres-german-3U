require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'http://34.58.138.83:3000'] }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Days to expire endpoint
app.post('/api/days-to-expire', (req, res) => {
  const { day, month, year } = req.body;
  if (!day || !month || !year) {
    return res.status(400).json({ error: 'Missing day, month, or year' });
  }
  const today = new Date();
  const expireDate = new Date(year, month - 1, day);
  const diffTime = expireDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  res.json({ daysToExpire: diffDays });
});

// Obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ expirationDate: 1 });
    
    // Calcular días de expiración para cada producto
    const today = new Date();
    const productsWithDays = products.map(product => {
      const expireDate = new Date(product.expirationDate);
      const diffTime = expireDate - today;
      const daysToExpire = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        expirationDate: product.expirationDate,
        category: product.category,
        stock: product.stock,
        daysToExpire: daysToExpire
      };
    });
    
    res.json(productsWithDays);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Buscar productos por nombre
app.get('/api/products/search', async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).sort({ expirationDate: 1 });
    
    const today = new Date();
    const productsWithDays = products.map(product => {
      const expireDate = new Date(product.expirationDate);
      const diffTime = expireDate - today;
      const daysToExpire = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        expirationDate: product.expirationDate,
        category: product.category,
        stock: product.stock,
        daysToExpire: daysToExpire
      };
    });
    
    res.json(productsWithDays);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar productos' });
  }
});

// Obtener producto por ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    const today = new Date();
    const expireDate = new Date(product.expirationDate);
    const diffTime = expireDate - today;
    const daysToExpire = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    res.json({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      expirationDate: product.expirationDate,
      category: product.category,
      stock: product.stock,
      daysToExpire: daysToExpire
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
