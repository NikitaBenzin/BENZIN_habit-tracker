const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('assets'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/settings', (req, res) => {
  res.render('settings')
})

const PORT = 3000

app.listen(3000, () => {
  console.log(`Server started: http://localhost:${PORT}`)
})