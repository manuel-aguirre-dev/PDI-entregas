import express from 'express';

const router = express.Router();

router.get("/", async(req, res) => {
    try{
    const admin= await prisma.admin.findMany();
    res.json(admin)
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
    });

router.get('/:id', async(req, res) => {
    try{
    const id = parseInt(req.params.id);
    const admin = await prisma.admin.findUnique({
        where: { id : id }
    })
    res.json(admin);
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
});    

router.post("/", async(req, res) =>{
    try{
    const admin = await prisma.admin.create({
    data: req.body
  })
  res.json(admin);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async(req, res) => {
    try{
 const id = parseInt(req.params.id);
 const admin= await prisma.admin.findUnique({
    where: {id: id}
 })
 const eliminar= await prisma.admin.delete({
    where: {id: id}
 })
 res.json({ mensaje: `El admin ${admin.nombre} ha sido eliminado`, admin: eliminado });
   } catch (error) {
    res.status(500).json({ error: error.message });
  }
});   

router.put('/:id', async(req, res) =>{
    try{
   const id = parseInt(req.params.id);
   const {nombre,email,password} =req.body;
   const actualizado= await prisma.admin.update({
    where: {id:id},
    data: {nombre,email,password}
   })
   res.json(actualizado)
     } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;