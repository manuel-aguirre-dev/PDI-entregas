// routes/productos.routes.js

import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  try{
  const productos = await prisma.productos.findMany();
  res.json(productos);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try{
  const id = req.params.id;
  const productos = await prisma.productos.findUnique({
    where: { nombre: id }
  });
  res.json(productos);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try{
  const { nombre, precio, cantidad } = req.body;
  const productos = await prisma.productos.create({
    data: {
      nombre,
      precio,
      cantidad
    },
  });
  res.json(productos);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.delete('/:id', async (req, res) => {
  try{
 const id = req.params.id;
const producto = await prisma.productos.findUnique({
  where: { nombre: id }
});
const eliminado = await prisma.productos.delete({
  where: { nombre: id }
});
res.json({ mensaje: `El producto ${producto.nombre} ha sido eliminado`, producto: eliminado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});   

router.put('/:id', async (req, res) =>{
  try{
    const id = req.params.id;
    const { nombre, precio, cantidad } = req.body;
    const actualizado = await prisma.productos.update({
        where: { nombre: id },
        data: { nombre, precio, cantidad }
    });
    res.json(actualizado);
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
