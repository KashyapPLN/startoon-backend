import express, { response } from "express";
import { createUser,getUserByName, saveLoginInfo, updateUserLoginInfo } from "./usersFunctions.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { client } from "../index.js";

const router =express.Router();

async function genHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt =await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword =await bcrypt.hash(password,salt);
    return(salt,hashedPassword);
    
    }
    
   router.post('/signup',async function (req, res) {
 
     const {name,password,gender,email}= req.body;
  if(password.length<6){
    res.status(400).send({message:"password must contain a mininmum of 6 characters"})
}

    
    const hashedPassword = await genHashedPassword(password);
   
    try{
  const result = await createUser({_id:email,password:hashedPassword,gender:gender,email:email,name:name});
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


   router.post('/login',async function (req, res) {
 
    const {email,password}= req.body;

const userFromDb = await getUserByName(email);
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
   updateUserLoginInfo(email); // Update user login information

   const loginInfo = {
     email: email,
     name: userFromDb.name,
     loginDate: new Date(),
     count: userFromDb.loginInfo ? userFromDb.loginInfo.count + 1 : 1
   };

   saveLoginInfo(loginInfo);

  res.send({message:"Login Successful",token:token,user: {
    email: email,
    name: userFromDb.name,
    gender: userFromDb.gender
  }})
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
  
  router.get('/loginInfo', async function (req, res) {
    try {
      const loginInfo = await client.db("startoon_app").collection("loginInfo").find().toArray();
      res.send(loginInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

     export const usersRouter=router;


