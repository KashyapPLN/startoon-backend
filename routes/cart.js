import express, { response } from "express";
import { ObjectId } from "mongodb";
import {getAllCartItemsById,addItem,updateCartById,deleteCartById} from "./cartFunctions.js"
const router =express.Router();

router.get('/:_id',async function (req, res) {
  const {_id} = req.params;
     console.log(req.params,_id);
   
    console.log(req);
  
   const desserts = await getAllCartItemsById(_id)
      res.send(desserts)
    })

    router.post('/',async function (req, res) {
 
        const data= req.body;
      console.log(data);
      try{
      const result = await addItem(data);
        res.send(result);
      }catch(ex){
console.log("Exception is " ,ex)
      }})

        router.post('/:_id', async function (req, res) {
          const {_id} = req.params;
          console.log(req.params,_id)
          const data=req.body;
      
          const result = await updateCartById(_id, data);
        res.send(result);
          
        })

        router.delete('/:_id', async function (req, res) {
          const {_id} = req.params;
          
          
          const item= await deleteCartById(_id);
          
          item.deletedCount>0 ? res.send(item) : res.status(400).send({msg : "menu item not found"});
        })


     
       
        export const cartRouter=router;