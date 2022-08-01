import express from "express";
import {client} from "../index.js";
const router =express.Router();

 router.get('/',async function (req, res) {
   // if(req.query.rating){
   //   req.query.rating=+req.query.rating;
   // }
   console.log(req.query);
 
  const desserts = await client.db("GID_project").collection("DessertsData").find(req.query).toArray()
     res.send(desserts)
   })
 
   router.get('/:id', async function (req, res) {
     const {id} = req.params;
     console.log(req.params,id);
     //  const item = desserts.filter((mi)=> mi.id==id);
     const item= await client.db("GID_project").collection("DessertsData").findOne({id:parseInt(id)})
     
     item ? res.send(item) : res.status(400).send({msg : "menu item not found"});
   })
  
 
   router.post('/',async function (req, res) {
 
     const data= req.body;
   console.log(data);
   const result = await client.db("GID_project").collection("DessertsData").insertMany(data);
     res.send(result);})
     
     router.delete('/:id', async function (req, res) {
       const {id} = req.params;
       
       
       const item= await client.db("GID_project").collection("DessertsData").deleteOne({id:parseInt(id)})
       
       item.deletedCount>0 ? res.send(item) : res.status(400).send({msg : "menu item not found"});
     })
 
     router.put('/:id', async function (req, res) {
       const {id} = req.params;
       console.log(req.params,id)
       const data=req.body;
   
       const result = await client.db("GID_project").collection("DessertsData").updateOne({id:parseInt(id)},{$set:data});
     res.send(result);
       
     })
 

     export const dessertsRouter=router;