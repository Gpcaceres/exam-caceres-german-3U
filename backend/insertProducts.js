// Script para ejecutar directamente en MongoDB Compass o Mongo Shell
// Ejecutar en la base de datos: travel_brain

// 1. Cambiar a la base de datos travel_brain
use('travel_brain');

// 2. Eliminar productos anteriores (opcional)
db.companydb.deleteMany({});

// 3. Insertar productos
db.companydb.insertMany([
  {
    name: 'Leche Entera',
    description: 'Leche entera pasteurizada 1L',
    price: 2.50,
    expirationDate: new Date('2026-02-20'),
    category: 'Lácteos',
    stock: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Yogurt Natural',
    description: 'Yogurt natural sin azúcar 500g',
    price: 3.20,
    expirationDate: new Date('2026-02-15'),
    category: 'Lácteos',
    stock: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Pan Integral',
    description: 'Pan de molde integral 500g',
    price: 1.80,
    expirationDate: new Date('2026-02-12'),
    category: 'Panadería',
    stock: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Jamón York',
    description: 'Jamón york loncheado 200g',
    price: 4.50,
    expirationDate: new Date('2026-03-01'),
    category: 'Embutidos',
    stock: 40,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Queso Cheddar',
    description: 'Queso cheddar en lonchas 250g',
    price: 5.00,
    expirationDate: new Date('2026-03-15'),
    category: 'Lácteos',
    stock: 35,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Zumo de Naranja',
    description: 'Zumo de naranja natural 1L',
    price: 2.80,
    expirationDate: new Date('2026-02-18'),
    category: 'Bebidas',
    stock: 60,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Pollo Fresco',
    description: 'Pechuga de pollo fresca 500g',
    price: 6.50,
    expirationDate: new Date('2026-02-11'),
    category: 'Carnes',
    stock: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ensalada Mixta',
    description: 'Ensalada mixta preparada 300g',
    price: 3.50,
    expirationDate: new Date('2026-02-10'),
    category: 'Verduras',
    stock: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Mantequilla',
    description: 'Mantequilla con sal 250g',
    price: 2.20,
    expirationDate: new Date('2026-04-01'),
    category: 'Lácteos',
    stock: 45,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Huevos Frescos',
    description: 'Docena de huevos frescos',
    price: 3.00,
    expirationDate: new Date('2026-02-25'),
    category: 'Huevos',
    stock: 80,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// 4. Verificar la inserción
db.products.countDocuments();
