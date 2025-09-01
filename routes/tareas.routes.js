// routes/tareas.routes.js
import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

// con filtro opcional
router.get("/", async (req, res) => {
  try {
    const { titulo } = req.query;
    const tareas = await prisma.tarea.findMany({
      where: titulo ? { titulo: { contains: titulo } } : {},
      orderBy: { titulo: "asc" },
    });
    res.status(200).json(tareas);
  } catch (error) {
    console.error("Error al listar tareas:", error);
    res.status(500).json({ error: "Error al traer las tareas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await prisma.tarea.findUnique({ where: { id } });

    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    res.status(200).json(tarea);
  } catch (error) {
    console.error("Error al obtener tarea:", error);
    res.status(500).json({ error: "Error al traer la tarea" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, path } = req.body;
    if (!titulo || !descripcion || !path)
      return res.status(400).json({ error: "Faltan datos" });

    const tarea = await prisma.tarea.create({
      data: { titulo, descripcion, path },
    });

    res.status(200).json({ mensaje: "Tarea creada", tarea });
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, path } = req.body;

    const existe = await prisma.tarea.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ error: "Tarea no encontrada" });

    const tarea = await prisma.tarea.update({
      where: { id },
      data: {
        titulo: titulo ?? existe.titulo,
        descripcion: descripcion ?? existe.descripcion,
        path: path ?? existe.path,
      },
    });

    res.status(200).json({ mensaje: "Tarea actualizada", tarea });
  } catch (error) {
    console.error("Error al editar tarea:", error);
    if (error.code === "P2002")
      return res.status(400).json({ error: "Ese path ya está en uso" });

    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existe = await prisma.tarea.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ error: "Tarea no encontrada" });

    await prisma.tarea.delete({ where: { id } });
    res.status(200).json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    console.error("Error al borrar tarea:", error);
    res.status(500).json({ error: "Error al borrar la tarea" });
  }
});

export default router;