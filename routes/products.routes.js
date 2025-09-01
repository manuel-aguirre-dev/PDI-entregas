import express from 'express';
import prisma from '../lib/prisma';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const { productos } = await prisma.productos.findMany({
            orderBy: {
                precio: `ASC`
            }
        })
        res.json.productos
    } catch (error) {
        console.error(`error al obtener productos`, error);
    }
})

router.post('/', async (req, res) => {
  try {
    const { nombre, precio, descripcion, path } = req.body;

    if (!nombre || !precio || !descripcion) {
      return res.status(400).json({ error: "Faltan datos" });
    }   
    
    const nombreExistente = await prisma.productos.findUnique({
      where: { nombre },
    }); 
    if (nombreExistente) {
      return res.status(400).json({ error: "El nombre ya existe" });
    }

    const producto = await prisma.productos.create({
      data: { nombre, precio, descripcion, path },
    });
    return res.status(200).json({ mensaje: "Producto creado", producto });

  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

// (ia poq no tengo idea)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion, path } = req.body;

    //existe?
  const producto = await prisma.productos.findUnique({ where: { id } });
  if (!producto) return res.status(404).json({ error: "Producto inexistente" });

  // nombre duplicado?
  if (nombre && nombre !== producto.nombre) {
    const nombreExistente = await prisma.productos.findUnique({ where: { nombre } });
    if (nombreExistente) return res.status(400).json({ error: "Ese nombre ya existe" });
  }

  const productoActualizado = await prisma.productos.update({
    where: { id },
    data: {
      nombre: nombre ?? producto.nombre,
      precio: precio ?? producto.precio,
      descripcion: descripcion ?? producto.descripcion,
      path: path ?? producto.path
    }
  });

  res.status(200).json({ mensaje: "Producto actualizado", producto: productoActualizado });
});


router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const existe = await prisma.productos.findUnique({where: {id} });
        if (!existe) return res.status(404).json({ error: "Producto inexistente"});

        await prisma.productos.delete({ where: {id}});
        res.status(200).json({mensaje: "Producto eliminado"});
    }catch(error){
        console.error("error al borrar el producto: ", error);
        res.status(500).json({error: "error del servidor"});
    }
})

export default router;  // Lo vamos a querer exportar para llamarlo en nuestro index.js
