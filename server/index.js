const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./database.js')
const bodyParser = require('body-parser')
const HTTP_PORT = 3000

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(HTTP_PORT, () => {
  console.log('Server is running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})

app.get('/api/item', (req, res, next) => {
  const query = 'SELECT * FROM item'
  const params = []
  db.all(query, (e, rows) => {
    if (e) {
      res.status(400).json({ error: e.message })
      return
    }
    res.json({
      items: rows,
    })
  })
})

app.post('/api/item', (req, res, next) => {
  const item = {
    itemName: req.body.itemName,
  }

  const query = 'INSERT INTO item (itemName) VALUES (?)'
  const param = item.itemName

  db.run(query, param, (e, result) => {
    if (e) {
      res.status(400).json({ error: e.message })
      return
    }
    res.json({
      item: item,
    })
  })
})

app.delete('/api/item/:id', (req, res, next) => {
  const query = 'DELETE FROM item WHERE itemId = ?'
  const param = req.params.id
  db.run(query, param, (e, result) => {
    if (e) {
      res.status(400).json({ error: e.message })
      return
    }
    res.json({ message: 'deleted', rows: this.changes })
  })
})
