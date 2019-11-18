const express = require('express')
const bodyParser = require('body-parser')

const db = require('./models')

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

db.sequelize.sync().then(() => {
  app.get("/todos/", (req, res) => {

    db.TodoItem.findAll()
      .then(result => {
        res.status(200).json(result)
      }).catch(error => {
        res.status(400).json({ message: error.message })
      })
  })

  app.post("/todos/", (req, res) => {
    db.TodoItem.create({
      text: req.body.text,
      isCompleted: false,
    })
      .then(result => {
        res.status(201).json(result)
      }).catch(error => {
        res.status(400).json({ message: error.message })
      })
  })

  app.put("/todos/:id/", (req, res) => {
    db.TodoItem.update(
      {
        text: req.body.text,
        isCompleted: req.body.isCompleted
      },
      {
        where: { id: req.params.id }
      })
      .then(result => {
        res.status(204).send()
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  })

  app.delete("/todos/:id", (req, res) => {
    db.TodoItem.destroy({ where: { id: req.params.id }})
      .then(resutl => {
        res.status(204).send()
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  })

  app.listen(3030, () => {
    console.log("Server is running on http://localhost:3030/")
  })
})

