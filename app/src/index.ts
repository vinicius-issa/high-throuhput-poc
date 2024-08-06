import express from 'express'

const app = express();

app.use((_req, _res, next) => {
  console.log(`Request running on pod ${process.env.POD_NUMBER}`)
  next()
})

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.listen(3000,()=>{
  console.log("Application running")
})