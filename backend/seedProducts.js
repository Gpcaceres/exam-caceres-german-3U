require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch((err) => console.error('MongoDB connection error:', err));

// Sample products
const products = [
  {
    name: 'Whole Milk',
    description: 'Pasteurized whole milk 1L',
    price: 2.50,
    expirationDate: new Date('2026-02-20'),
    category: 'Dairy',
    stock: 50
  },
  {
    name: 'Natural Yogurt',
    description: 'Sugar-free natural yogurt 500g',
    price: 3.20,
    expirationDate: new Date('2026-02-15'),
    category: 'Dairy',
    stock: 30
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Whole wheat sliced bread 500g',
    price: 1.80,
    expirationDate: new Date('2026-02-12'),
    category: 'Bakery',
    stock: 25
  },
  {
    name: 'Ham',
    description: 'Sliced ham 200g',
    price: 4.50,
    expirationDate: new Date('2026-03-01'),
    category: 'Deli',
    stock: 40
  },
  {
    name: 'Cheddar Cheese',
    description: 'Sliced cheddar cheese 250g',
    price: 5.00,
    expirationDate: new Date('2026-03-15'),
    category: 'Dairy',
    stock: 35
  },
  {
    name: 'Orange Juice',
    description: 'Natural orange juice 1L',
    price: 2.80,
    expirationDate: new Date('2026-02-18'),
    category: 'Beverages',
    stock: 60
  },
  {
    name: 'Fresh Chicken',
    description: 'Fresh chicken breast 500g',
    price: 6.50,
    expirationDate: new Date('2026-02-11'),
    category: 'Meat',
    stock: 20
  },
  {
    name: 'Mixed Salad',
    description: 'Prepared mixed salad 300g',
    price: 3.50,
    expirationDate: new Date('2026-02-10'),
    category: 'Vegetables',
    stock: 15
  },
  {
    name: 'Butter',
    description: 'Salted butter 250g',
    price: 2.20,
    expirationDate: new Date('2026-04-01'),
    category: 'Dairy',
    stock: 45
  },
  {
    name: 'Fresh Eggs',
    description: 'Dozen fresh eggs',
    price: 3.00,
    expirationDate: new Date('2026-02-25'),
    category: 'Eggs',
    stock: 80
  }
];

// Insert products
async function seedDatabase() {
  try {
    // Clean collection first
    await Product.deleteMany({});
    console.log('Previous products deleted');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length} products inserted successfully`);
    
    // Show inserted products
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (Expires: ${product.expirationDate.toLocaleDateString()})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error inserting products:', error);
    process.exit(1);
  }
}

seedDatabase();
