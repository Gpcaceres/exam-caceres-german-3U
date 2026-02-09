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

// Productos de ejemplo
const products = [
  {
    name: 'Leche Entera',
    description: 'Leche entera pasteurizada 1L',
    price: 2.50,
    expirationDate: new Date('2026-02-20'),
    category: 'Lácteos',
    stock: 50
  },
  {
    name: 'Yogurt Natural',
    description: 'Yogurt natural sin azúcar 500g',
    price: 3.20,
    expirationDate: new Date('2026-02-15'),
    category: 'Lácteos',
    stock: 30
  },
  {
    name: 'Pan Integral',
    description: 'Pan de molde integral 500g',
    price: 1.80,
    expirationDate: new Date('2026-02-12'),
    category: 'Panadería',
    stock: 25
  },
  {
    name: 'Jamón York',
    description: 'Jamón york loncheado 200g',
    price: 4.50,
    expirationDate: new Date('2026-03-01'),
    category: 'Embutidos',
    stock: 40
  },
  {
    name: 'Queso Cheddar',
    description: 'Queso cheddar en lonchas 250g',
    price: 5.00,
    expirationDate: new Date('2026-03-15'),
    category: 'Lácteos',
    stock: 35
  },
  {
    name: 'Zumo de Naranja',
    description: 'Zumo de naranja natural 1L',
    price: 2.80,
    expirationDate: new Date('2026-02-18'),
    category: 'Bebidas',
    stock: 60
  },
  {
    name: 'Pollo Fresco',
    description: 'Pechuga de pollo fresca 500g',
    price: 6.50,
    expirationDate: new Date('2026-02-11'),
    category: 'Carnes',
    stock: 20
  },
  {
    name: 'Ensalada Mixta',
    description: 'Ensalada mixta preparada 300g',
    price: 3.50,
    expirationDate: new Date('2026-02-10'),
    category: 'Verduras',
    stock: 15
  },
  {
    name: 'Mantequilla',
    description: 'Mantequilla con sal 250g',
    price: 2.20,
    expirationDate: new Date('2026-04-01'),
    category: 'Lácteos',
    stock: 45
  },
  {
    name: 'Huevos Frescos',
    description: 'Docena de huevos frescos',
    price: 3.00,
    expirationDate: new Date('2026-02-25'),
    category: 'Huevos',
    stock: 80
  }
];

// Insertar productos
async function seedDatabase() {
  try {
    // Limpiar la colección primero
    await Product.deleteMany({});
    console.log('Productos anteriores eliminados');

    // Insertar nuevos productos
    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length} productos insertados exitosamente`);
    
    // Mostrar los productos insertados
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (Expira: ${product.expirationDate.toLocaleDateString()})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error al insertar productos:', error);
    process.exit(1);
  }
}

seedDatabase();
