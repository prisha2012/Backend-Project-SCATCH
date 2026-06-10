
const express=require('express');
const router=express.Router();
const productModel=require("../models/product-model")

// router.get("/",(req,res)=>{
//     res.send("hey");
// })
router.get("/create",(req,res)=>{
    res.render("createproducts");
});
router.get("/",async(req,res)=>{
    const products=await productModel.find();
    res.render("shop",{products});
})
router.post("/create",async(req,res)=>{
    const{name,price,image,bgcolor,panelcolor,textcolor}=req.body;
    const product=await productModel.create({
        name,
        price,
        image,
        bgcolor,
        panelcolor,
        textcolor
    });
    res.send(product);
});
module.exports=router