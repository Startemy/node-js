import express from "express"
const app = express()

app.get('/status', (req,res) => res.send('OK'))
app.listen(5555, () => console.log('Server has been started to http://localhost:5555'))