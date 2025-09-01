import productosRoutes from './productos.routes.js';
import ventasRoutes from './ventas.routes.js';
import usuariosRoutes from './usuarios.routes.js';
import adminRoutes from './admin.routes.js';

function registerRoutes(servidor) {
servidor.use('/productos', productosRoutes)
servidor.use('/ventas', ventasRoutes)
servidor.use('/usuarios', usuariosRoutes)
servidor.use('/admin', adminRoutes)
}

export default registerRoutes;
