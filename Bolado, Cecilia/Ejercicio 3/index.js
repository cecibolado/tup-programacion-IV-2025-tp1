import express from "express"

const app = express()
app.use(express.json())

let tareas = []
app.get("/", (req, res) => {
  res.send(tareas)
})

app.post("/tareas", (req, res) => {
  const { nombre, completada } = req.body

  if (!nombre) {
    return res
      .status(400)
      .json({ error: "El nombre de la tarea es obligatorio" })
  }

  const existe = tareas.some(
    (t) => t.nombre.toLowerCase() === nombre.toLowerCase()
  )
  if (existe) {
    return res.status(400).json({ error: "La tarea ya existe" })
  }

  const nuevaTarea = {
    nombre,
    completada: completada || false,
  }

  tareas.push(nuevaTarea)

  res.status(201).json(nuevaTarea)
})

app.get("/tareas/completada", (req, res) => {
  const completada = tareas.filter((t) => t.completada)

  res.json(completada)
})

app.get("/tareas/incompletas", (req, res) => {
  const incompletas = tareas.filter((t) => !t.completada)
  res.json(incompletas)
})

app.put("/tareas/:nombre", (req, res) => {
  const { nombre } = req.params
  const { completada } = req.body

  const tarea = tareas.find(
    (t) => t.nombre.toLowerCase() === nombre.toLowerCase()
  )

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" })
  }

  if (completada !== undefined) {
    tarea.completada = completada
  }

  res.json(tarea)
})

const port = 3000
app.listen(port, () => {
  console.log("Servidor levantado")
})
