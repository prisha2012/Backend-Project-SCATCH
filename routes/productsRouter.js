
const express=require('express');
const router=express.Router();
const productModel=require("../models/product-model")
const userModel = require("../models/user-model");
const upload=require("../config/multer-config");
const orderModel=require("../models/order-model");
const { populate } = require('dotenv');
const isAdmin=require("../middlewares/isAdmin");

// router.get("/",(req,res)=>{
//     res.send("hey");
// })
router.get("/create",isAdmin,(req,res)=>{
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
router.get("/admin",isAdmin,async(req,res)=>{
    const products=await productModel.find();
    res.render("admin",{products});
})
router.get("/delete/:id",isAdmin,async(req,res)=>{
    await productModel.findByIdAndDelete(req.params.id);
    res.redirect("/products/admin");
})
router.get("/edit/:id",isAdmin,async (req,res)=>{
    const product=await productModel.findById(req.params.id);
    res.render("editproduct",{product});
})
router.get("/checkout",async(req,res)=>{
    const user=await userModel.findById(req.session.user).populate("cart");
    let total=0;
    user.cart.forEach(product=>{
        total+=product.price;
    })
    const order=await orderModel.create({
        user:user._id,
        products:user.cart.map(product=>product._id),
        total
    })
user.orders.push(order._id);
user.cart=[];
await user.save();
res.send("Order Placed Succesfully");
});
router.get("/orders",async(req,res)=>{
    const user=await userModel.findById(req.session.user).populate({path:"orders",populate:{path:"products"}});
    res.render("orders",{user});
})
router.post("/create",isAdmin, upload.single("image"),async(req,res)=>{
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
router.post("/update/:id",async(req,res)=>{
    const{name,price,bgcolor,panelcolor,textcolor}=req.body;
    await productModel.findByIdAndUpdate(req.params.id,{
        name,
        price,
        bgcolor,
        panelcolor,
        textcolor
    });
    res.redirect("/products/admin");
})
module.exports=router;