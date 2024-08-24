import express, {json, urlencoded} from 'express'
import { AppFactory } from './factories/appFactory';
import { addRoutes } from './config/routes';
import { MongoDBConnection } from './db';

const PORT = process.env.PORT || 3000
const POD_NUMBER = process.env.POD_NUMBER

AppFactory.generateDependencies();
MongoDBConnection.getClient();

const app = express();

app.use((_req, _res, next) => {
  console.log(`Request running on pod ${POD_NUMBER}`)
  next()
})
app.use(json());
app.use(urlencoded({ extended: true}))
addRoutes(app)

app.listen(PORT,()=>{
  console.log(`Application #${POD_NUMBER} running on port ${PORT}`)
})