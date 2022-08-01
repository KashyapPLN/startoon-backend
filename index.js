import express, { response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

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

const client = await createConnection();

// app.get('/',  function (req, res) {
//   res.send('Hello World')
// })
app.get('/',async function (req, res) {
  // if(req.query.rating){
  //   req.query.rating=+req.query.rating;
  // }
  console.log(req.query);

 const desserts = await client.db("GID_project").collection("DessertsData").find(req.query).toArray()
    res.send(desserts)
  })

  app.get('/:id', async function (req, res) {
    const {id} = req.params;
    console.log(req.params,id);
    //  const item = desserts.filter((mi)=> mi.id==id);
    const item= await client.db("GID_project").collection("DessertsData").findOne({id:parseInt(id)})
    
    item ? res.send(item) : res.status(400).send({msg : "menu item not found"});
  })
 

  app.post('/',async function (req, res) {

    const data= req.body;
  console.log(data);
  const result = await client.db("GID_project").collection("DessertsData").insertMany(data);
    res.send(result);})
    
    app.delete('/:id', async function (req, res) {
      const {id} = req.params;
      
      
      const item= await client.db("GID_project").collection("DessertsData").deleteOne({id:parseInt(id)})
      
      item.deletedCount>0 ? res.send(item) : res.status(400).send({msg : "menu item not found"});
    })

    app.put('/:id', async function (req, res) {
      const {id} = req.params;
      console.log(req.params,id)
      const data=req.body;
  
      const result = await client.db("GID_project").collection("DessertsData").updateOne({id:parseInt(id)},{$set:data});
    res.send(result);
      
    })

app.listen(PORT,()=>console.log(`App Started in ${PORT}`));