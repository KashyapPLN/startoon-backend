import express, { response } from "express";
import { createUser,getUserByName, updateUser,addAddress,updateAddressById,deleteAddressById, getAddressById,
   createOrder,deleteOrderById, getAllOrdersItemsByUserName,getOrderById,updateUserPassword,updateUserPhoneNumber } from "./usersFunctions.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
 import nodemailer from 'nodemailer';

const router =express.Router();

async function genHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt =await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword =await bcrypt.hash(password,salt);
    return(salt,hashedPassword);
    
    }
    
   router.post('/signup',async function (req, res) {
 
     const {userName,password,phoneNumber,email}= req.body;
  if(password.length<8){
    res.status(400).send({message:"password must contain a mininmum of 8 characters"})
}

    
    const hashedPassword = await genHashedPassword(password);
   
    try{
  const result = await createUser({_id:userName,password:hashedPassword,phoneNumber:phoneNumber,email:email});
  //res.send(result);
  res.status(200).send({message:"Registration Successful"})
  var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'kashyap.pln@outlook.com',
      pass: 'Kashyap@40'
    }
  });
  
  var mailOptions = {
    from: 'kashyap.pln@outlook.com',
    to: email,
    subject: 'Welcome Message',
    text: 'Welcome to The Great Indian Dessert ! Enjoy Our Wide Range Of Desserts.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

    }catch(ex){
      console.log("asgahsgah")
        if(ex.code===11000){
        res.status(400).send({message:"Username already exists "})
      }
        
     
    }
  
}

   )

   router.put('/update/:_id',async function (req, res) {
    const {_id} = req.params;
    console.log(req.params,_id);
    const {userName,password,phoneNumber,email}= req.body;
 if(password.length<8){
   res.status(400).send({message:"password must contain a mininmum of 8 characters"})
}

   
   const hashedPassword = await genHashedPassword(password);
  
   try{
 const result = await updateUser(_id,{password:hashedPassword,phoneNumber:phoneNumber,email:email});
 res.send(result);
   }catch(ex){
     console.log("asgahsgah"+ex)
       if(ex.code===11000){
       res.status(400).send({message:"Username already exists "})
     }
   }
 
}

  )

  router.put('/update-password/:_id',async function (req, res) {
    const {_id} = req.params;
    console.log(req.params,_id);
    const {password}= req.body;
 if(password.length<8){
   res.status(400).send({message:"password must contain a mininmum of 8 characters"})
}

   
   const hashedPassword = await genHashedPassword(password);
  
   try{
 const result = await updateUserPassword(_id,{password:hashedPassword});
 res.send(result);
   }catch(ex){
     console.log("asgahsgah"+ex)
       if(ex.code===11000){
       res.status(400).send({message:"Username already exists "})
     }
   }
 
})
router.put('/update-phone/:_id',async function (req, res) {
  const {_id} = req.params;
  console.log(req.params,_id);
  const {phoneNumber}= req.body;
if(phoneNumber.length<10){
 res.status(400).send({message:"Phone number must contain a mininmum of 10 numbers"})
}

 
 

 try{
const result = await updateUserPhoneNumber(_id,{phoneNumber});
res.send(result);
 }catch(ex){
   console.log("asgahsgah"+ex)
     if(ex.code===11000){
     res.status(400).send({message:"cannot change number "})
   }
 }

}

  )


   router.post('/login',async function (req, res) {
 
    const {uName,password}= req.body;

const userFromDb = await getUserByName(uName);
console.log(userFromDb);
if(!userFromDb){
  res.status(401).send({message:"Invalid Credentials"})
} else{
 const storedPassword = userFromDb.password;
 const isPasswordMatch = await bcrypt.compare(password,storedPassword);
 console.log(isPasswordMatch);
 if(isPasswordMatch){
  const token = jwt.sign({id:userFromDb._id},process.env.SECRET_KEY)
console.log('hi',token)
  const decoded = jwt.verify(token, 'my_secret_key');
   console.log(decoded);
  res.send({message:"Login Successful",token:token,user:uName})
 } else{
  res.status(401).send({message:"Invalid Credentials"})
 }
}
  })
 
  router.get('/validateuser/:key',async function(req,res){
    console.log("hello")
    const {key} = req.params;
    console.log(key);
    const decoded = jwt.verify(key, 'my_secret_key');
    
    res.send({message:"Successful",user:decoded})
  })
  
  router.post('/address',async function (req, res) {  
    const data= req.body;
    console.log(data);
    try{
    const result = await addAddress(data);
      res.send(result);
    }catch(ex){
console.log("Exception is " ,ex)
    }

   })
   router.put('/:_id', async function (req, res) {
    const {_id} = req.params;
    console.log(req.params,_id)
    const data=req.body;

    const result = await updateAddressById(_id, data);
  res.send(result);
    
  })


  router.delete('/:_id', async function (req, res) {
    const {_id} = req.params;
    
    
    const item= await deleteAddressById(_id);
    
    item.deletedCount>0 ? res.send(item) : res.status(400).send({msg : "address not found"});
  })


  router.get('/:_id', async function (req, res) {
    const {_id} = req.params;
    console.log(req.params,_id);
    
    const item= await getAddressById(_id)
    
    item ? res.send(item) : res.status(400).send({msg : "address not found"});
  })
 
  router.post('/orders',async function (req, res) {  
    const data= req.body;
    console.log(data);
    try{
    const result = await createOrder(data);
      res.send(result);
    }catch(ex){
console.log("Exception is " ,ex)
    }

   })
   router.delete('/orders/:_id', async function (req, res) {
    const {_id} = req.params;
    
    
    const item= await deleteOrderById(_id);
    
    item.deletedCount>0 ? res.send(item) : res.status(400).send({msg : "order not found"});
  })

  router.get('/orders/:userName',async function (req, res) {
    const {userName} = req.params;
       console.log(req.params,userName);
     
      console.log(req);
    
     const orders = await getAllOrdersItemsByUserName(userName)
        res.send(orders)
      })

      router.get('/order/:_id',async function (req, res) {
        const {_id} = req.params;
           console.log(req.params,_id);
         
          console.log(req);
        
         const currentOrder = await getOrderById(_id)
            res.send(currentOrder)
          })

    

     export const usersRouter=router;


