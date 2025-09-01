import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
  try{
  const ventas = await prisma.ventas.findMany();
  res.json(ventas);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try{
  const id = parseInt(req.params.id);

  const ventas = await prisma.ventas.findUnique({
    where: { id: id }
  });
  res.json(ventas);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});    

router.post("/", async (req, res) =>{
    try{
    const ventas = await prisma.ventas.create({
      data: req.body
    });
    res.json(ventas);
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async(req, res) => {
  try{
   const id = parseInt(req.params.id);

    const venta = await prisma.ventas.findUnique({
  where: { id: id }
});   
   const eliminado = await prisma.ventas.delete({
    where: { id: id }
    });
    res.json({ mensaje: `La venta con ID ${venta.id} ha sido eliminada`, venta: eliminado });
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
});   

router.put('/:id', async (req, res) =>{
  try{
    const id = parseInt(req.params.id);
    const { usuarioId, productoId, cantidad, total } = req.body;
    const actualizado = await prisma.ventas.update({
        where: { id: id },
        data: { usuarioId, productoId, cantidad, total }
    });
    res.json(actualizado);
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;