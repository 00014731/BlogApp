const express = require('express')
const app = express()

const port = 8000

app.set('view engine', 'pug')

// http://localhost:8000
app.get('/', (req, res) => {
    res.render('home')
  })

app.listen(port, (err) => {
    if (err) throw err

    console.log(`Server listening at http://localhost:${port}`)
  })

