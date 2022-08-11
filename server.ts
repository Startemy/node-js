import express from "express"
const app = express()
app.get('/hel+o', function (req, res) {
  res.send('Hello ')
})
app.get('/hell?o/file', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get('/hello/stat', function (req, res) {
  res.sendStatus(404)
})

app.listen(5000, () => console.log('Server started'))
