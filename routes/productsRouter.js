
const express=require('express');
const router=express.Router();
const productModel=require("../models/product-model")
const userModel = require("../models/user-model");
const upload=require("../config/multer-config");

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
router.get("/addtocart/:productid",async(req,res)=>{

    console.log("Current Session:", req.session.user);

    const user = await userModel.findById(req.session.user);

    if(!user){
        return res.send("User not found. Login again.");
    }

    user.cart.push(req.params.productid);

    await user.save();

    res.redirect("/products");
});
router.get("/cart",async(req,res)=>{
   const user = await userModel
    .findById(req.session.user)
    .populate("cart");

if(!user){
    return res.send("Please login first");
}
    let total=0;
    user.cart.forEach(product=>{
        total+=product.price;
    })
    res.render("cart",{user,total});
})
router.get("/remove/:productid",async(req,res)=>{
    const user=await userModel.findById(req.session.user);
    user.cart=user.cart.filter(item=>{
        return item.toString()!==req.params.productid;
    })
    await user.save();
    res.redirect("/products/cart");
})
router.post("/create", upload.single("image"),async(req,res)=>{
    const{name,price,bgcolor,panelcolor,textcolor}=req.body;
    const product=await productModel.create({
        name,
        price,
        image:req.file.filename,
        bgcolor,
        panelcolor,
        textcolor
    });
    res.send(product);
});
module.exports=router;