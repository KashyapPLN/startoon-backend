import express, { response } from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import dotenv from "dotenv";
import { dessertsRouter } from "./routes/desserts.js";
import {usersRouter} from "./routes/users.js";
import {cartRouter} from "./routes/cart.js";
// import nodemailer from 'nodemailer';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// const MONGO_URL = "mongodb://localhost";
// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const PORT =process.env.PORT;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

export const client = await createConnection();

app.get('/',  function (req, res) {
  res.send('Hello World')
})

app.use("/desserts",dessertsRouter)
app.use("/user",usersRouter)
app.use("/cart",cartRouter)

app.listen(PORT,()=>console.log(`App Started in ${PORT}`));






























