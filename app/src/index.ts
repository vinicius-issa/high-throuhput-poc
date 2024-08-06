import express from 'express'

const app = express();
const PORT = process.env.PORT || 3000
const POD_NUMBER = process.env.POD_NUMBER

app.use((_req, _res, next) => {
  console.log(`Request running on pod ${POD_NUMBER}`)
  next()
})

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.listen(PORT,()=>{
  console.log(`Application #${POD_NUMBER} running on port ${PORT}`)
})