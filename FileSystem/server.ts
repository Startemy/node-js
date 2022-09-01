import fs from 'fs';
import readline from 'readline';
import path from 'path';
import express from 'express'
import exphbs from 'express-handlebars'

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const app = express()

const static_path = './public'
const pathIndex = path.resolve('index.html')
const pathInd = path.resolve('./public/subdir.html')

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'public/views')

app.use(express.json())
app.use(express.static(static_path));

app.get('/', (req, res) => {
  // res.sendFile(pathIndex)
  res.render('index')
})

app.post('/', (req, res) => {
  const inDir = req.body.directIntr
  const puti: string = path.resolve('../',inDir)
  fs.stat(puti, (err) => {
    if (err) {
      console.log('Такой директории не существует')
    }
    let directories: {} = fs.readdirSync(puti)
    console.log("\nCurrent directory filenames:");
    res.send(JSON.stringify(directories));
  })
})

app.get('*', (req, res) => {
  // res.sendFile(pathInd)
  res.render('subdir')
})

app.post('*', (req, res) => {
  const inDir = req.body.dir
  const puti: string = path.resolve('../', inDir)
  console.log(puti)
  fs.stat(puti, (err) => {
    if (err) {
      console.log('Такой директории не существует')
    }
    let directories: {} = fs.readdirSync(puti)
    console.log("\nCurrent directory filenames:");
    res.send(JSON.stringify(directories));
  })
})

app.listen(5555, () => console.log('Server has been started to http://localhost:5555'))