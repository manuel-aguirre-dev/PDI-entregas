import express from 'express';
import productosRoutes from './routes/productos.routes.js'; // Importamos el router

const app = express();

app.use('/productos', productosRoutes)

app.listen(3000, function () {
  console.log('Servidor escuchando en el puerto 3000');
});
