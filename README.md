# exam-caceres-german-3U

Sistema de Gestión de Productos con Calculadora de Días de Expiración

## 🚀 Tecnologías

- **Frontend**: React
- **Backend**: Node.js + Express
- **Base de Datos**: MongoDB
- **Containerización**: Docker & Docker Compose

## 📋 Requisitos

- Node.js 18+ (para ejecución local)
- Docker & Docker Compose (para ejecución con contenedores)
- MongoDB (local o Atlas)

## 💻 Ejecución Local

### Backend
```bash
cd backend
npm install
npm start
```
El backend se ejecutará en http://localhost:5000

### Frontend
```bash
cd backend/frontend
npm install
npm start
```
El frontend se ejecutará en http://localhost:3000

### Insertar productos de prueba
```bash
cd backend
node seedProducts.js
```

## 🐳 Ejecución con Docker

### Iniciar todos los servicios
```bash
docker-compose up -d
```

### Insertar productos de prueba
```bash
docker-compose exec backend node seedProducts.js
```

### Ver logs
```bash
docker-compose logs -f
```

### Detener servicios
```bash
docker-compose down
```

## 🔗 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017 (local) o mongodb://admin:admin123@localhost:27017 (Docker)

## 📚 Funcionalidades

✅ Calculadora de días de expiración  
✅ Gestión de inventario de productos  
✅ Búsqueda de productos por nombre  
✅ Visualización con colores según días de expiración  
✅ API RESTful para productos  

## 🗂️ Estructura del Proyecto

```
exam-caceres-german-3U/
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── App.js
│   │   │   └── App.css
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── index.js
│   ├── seedProducts.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 📖 Documentación Adicional

- [Guía de Docker](DOCKER_GUIDE.md)