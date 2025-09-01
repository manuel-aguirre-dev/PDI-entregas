import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    try{
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
    });

router.get('/:id', async (req, res) => {
    try{
   const id = parseInt(req.params.id);

   const usuarios = await prisma.usuarios.findUnique({
    where: { id: id }
   });
   res.json(usuarios);
     } catch (error) {
    res.status(500).json({ error: error.message });
  }
});    

router.post("/", async (req, res) =>{
    try{
  const usuarios = await prisma.usuarios.create({
    data: req.body
  });
  res.json(usuarios);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
    try{
     const id = parseInt(req.params.id);

     const usuario = await prisma.usuarios.findUnique({
  where: { id: id }
});   
    const eliminado = await prisma.usuarios.delete({
    where: { id: id }
    });
    res.json({ mensaje: `El usuario ${usuario.nombre} ha sido eliminado`, usuario: eliminado });
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) =>{
    try{
    const id = parseInt(req.params.id);

    const { nombre, email, password } = req.body;
    const actualizado = await prisma.usuarios.update({
        where: { id: id },
        data: { nombre, email, password }
    });
    res.json(actualizado);
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;