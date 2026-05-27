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
});
router.post("/login", async(req,res)=>{
    const{email,password}=req.body;
    const user=await userModel.findOne({email});
    if(!user) {return res.send("User not found");}
    bcrypt.compare(password,user.password,function(err,result){
        if(result) {
            req.session.user=user._id;
            res.send("Login Succesful");
        }
        else {res.send("Incorect Password");}
    });

});
router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.send("You must login");
    }
    res.send("Welcome to profile");
});

module.exports=router