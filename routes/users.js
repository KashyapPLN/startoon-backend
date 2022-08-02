import express, { response } from "express";
import { createUser,getUserByName } from "./usersFunctions.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router =express.Router();

async function genHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt =await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword =await bcrypt.hash(password,salt);
    return(salt,hashedPassword);
    
    }
    
   router.post('/signup',async function (req, res) {
 
     const {userName,password}= req.body;

const userFromDb = await getUserByName(userName);
console.log(userFromDb);
if(userFromDb){
    res.status(400).send({message:"Username already exists"})
} else if(password.length<8){
    res.status(400).send({message:"password must contain a mininmum of 8 characters"})
}
 else{
    
    const hashedPassword = await genHashedPassword(password);
   
  const result = await createUser({userName:userName,password:hashedPassword});
  res.send(result);
}

   })


   router.post('/login',async function (req, res) {
 
    const {userName,password}= req.body;

const userFromDb = await getUserByName(userName);
console.log(userFromDb);
if(!userFromDb){
  res.status(401).send({message:"Invalid Credentials"})
} else{
 const storedPassword = userFromDb.password;
 const isPasswordMatch = await bcrypt.compare(password,storedPassword);
 console.log(isPasswordMatch);
 if(isPasswordMatch){
  const token = jwt.sign({id:userFromDb._id},process.env.SECRET_KEY)
  res.send({message:"Login Successful",token:token})
 } else{
  res.status(401).send({message:"Invalid Credentials"})
 }
}
  })
     
 
     
 

     export const usersRouter=router;


