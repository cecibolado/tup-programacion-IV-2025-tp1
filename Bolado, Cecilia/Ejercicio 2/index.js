import express from "express"

const app = express()
app.use(express.json())

let alumnos = []
app.get("/", (req, res) => {
  res.send(alumnos)
})

app.post("/alumnos", (req, res) => {
  const { nombre, notas } = req.body

  if (alumnos.find((a) => a.nombre === nombre)) {
    return
  }

  alumnos.push({
    nombre,
    notas,
  })
  res.send("alumno guardado")
})

app.get("/condicion", (req, res) => {
  const notas = alumnos.map((a) => {
    const promedio =
      a.notas.reduce((acum, notas) => acum + notas, 0) / a.notas.length

    let condicion = ""
    if (promedio < 6) {
      condicion = "desaprobado"
    } else if (promedio >= 6 && promedio <= 7) {
      condicion = "regular"
    } else if (promedio >= 8) {
      condicion = "promocionado"
    }

    return { ...a, promedio, condicion }
  })
  res.json(notas)
})

const port = 3000
app.listen(port, () => {
  console.log("Servidor levantado")
})
