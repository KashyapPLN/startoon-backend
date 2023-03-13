import express, { response } from "express";
import { createUser,getUserByName, updateUser,updateUserPassword,updateUserPhoneNumber} from "./usersFunctions.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


const router =express.Router();

async function genHashedPassword(pwd){
    const NO_OF_ROUNDS = 10;
    const salt =await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword =await bcrypt.hash(pwd,salt);
    return(salt,hashedPassword);
    
    }
    
   router.post('/marlotask/signup',async function (req, res) {
 
     const {fN,mN,lN,pwd,phn,email,occu,comp,dob}= req.body;
    
    const hashedPassword = await genHashedPassword(pwd);
   
    try{
  const result = await createUser({_id:fN,pwd:hashedPassword,phn:phn,email:email,dob,comp,lN,mN});
  //res.send(result);
  res.status(200).send({message:"Registration Successful"})
  
    }catch(ex){
      console.log("asgahsgah")
        if(ex.code===11000){
        res.status(400).send({message:"Username already exists "})
      }
        
     
    }
  
}

   )

   router.put('/marlotask/update/:_id',async function (req, res) {
    const {_id} = req.params;
    console.log(req.params,_id);
    const {userName,password,phoneNumber,email}= req.body;


   
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

  router.put('/marlotask/update-password/:_id',async function (req, res) {
    const {_id} = req.params;
    console.log(req.params,_id);
    const {pwd}= req.body;


   
   const hashedPassword = await genHashedPassword(pwd);
  
   try{
 const result = await updateUserPassword(_id,{pwd:hashedPassword});
 res.send(result);
   }catch(ex){
     console.log("asgahsgah"+ex)
       if(ex.code===11000){
       res.status(400).send({message:"Username already exists "})
     }
   }
 
})
router.put('/marlotask/update-phone/:_id',async function (req, res) {
  const {_id} = req.params;
  console.log(req.params,_id);
  const {phn}= req.body;
if(phn.length<10){
 res.status(400).send({message:"Phone number must contain a mininmum of 10 numbers"})
}

 
 

 try{
const result = await updateUserPhoneNumber(_id,{phn});
res.send(result);
 }catch(ex){
   console.log("asgahsgah"+ex)
     if(ex.code===11000){
     res.status(400).send({message:"cannot change number "})
   }
 }

}

  )


   router.post('/marlotask/login',async function (req, res) {
 
    const {fN,pwd}= req.body;

const userFromDb = await getUserByName(fN);
console.log(userFromDb);
if(!userFromDb){
  res.status(401).send({message:"Invalid Credentials"})
} else{
 const storedPassword = userFromDb.pwd;
 const isPasswordMatch = await bcrypt.compare(pwd,storedPassword);
 console.log(isPasswordMatch);
 if(isPasswordMatch){
  const token = jwt.sign({id:userFromDb._id},process.env.SECRET_KEY)
console.log('hi',token)
  const decoded = jwt.verify(token, 'my_secret_key');
   console.log(decoded);
  res.send({message:"Login Successful",token:token,user:fN})
 } else{
  res.status(401).send({message:"Invalid Credentials"})
 }
}
  })
 
  router.get('/marlotask/validateuser/:key',async function(req,res){
    console.log("hello")
    const {key} = req.params;
    console.log(key);
    const decoded = jwt.verify(key, 'my_secret_key');
    
    res.send({message:"Successful",user:decoded})
  })
  





         









     export const usersRouter=router;


