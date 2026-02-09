# Docker Compose - Guía de Uso

## Servicios incluidos:
- **MongoDB**: Base de datos (puerto 27017)
- **Backend**: API Node.js/Express (puerto 5000)
- **Frontend**: React App (puerto 3000)

## Comandos principales:

### Iniciar todos los servicios:
```bash
docker-compose up -d
```

### Ver logs de los servicios:
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Detener todos los servicios:
```bash
docker-compose down
```

### Detener y eliminar volúmenes (borra la base de datos):
```bash
docker-compose down -v
```

### Reconstruir los contenedores:
```bash
docker-compose up -d --build
```

### Ejecutar el seed de productos (después de iniciar los servicios):
```bash
docker-compose exec backend node seedProducts.js
```

### Ver el estado de los servicios:
```bash
docker-compose ps
```

## Acceso a los servicios:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://admin:admin123@localhost:27017

## MongoDB Compass:
Conectar con: `mongodb://admin:admin123@localhost:27017/productsDB?authSource=admin`

## Notas:
- La primera vez tardará un poco porque debe descargar las imágenes
- Los datos de MongoDB se persisten en un volumen Docker
- Para desarrollo, los cambios se reflejan automáticamente gracias a los volúmenes
