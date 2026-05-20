const express=require('express');
const router=express.Router();
const ownerModel=require("../models/owners-model");

router.get("/",(req,res)=>{
    res.send("hey");
})

if(process.env.NODE_ENV==="development"){

    router.post("/create",async(req,res)=>{
      let owners= await ownerModel.find();
      if(owners.length>0)return res.status(500).send("Caanot create");
      let{fullname,email,password}=req,body;
     let createdowner= await ownerModel.create({
    fullname, 
    email,
    password
      })
        res.status(200).send(createdowner);
    })
}

module.exports=router