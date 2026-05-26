const express=require('express');
const router=express.Router();
const userModel=require("../models/user-model");
const bcrypt=require("bcrypt");

router.get("/",(req,res)=>{
    res.render("index");
})

router.post("/register",async(req,res)=>{
    const{fullname,email,password}=req.body;
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function (err,hash) {

        const createdUser=await userModel.create({
            fullname,
            email,
            password: hash
        });
            res.send(createdUser)
        });
    });
});2
module.exports=router