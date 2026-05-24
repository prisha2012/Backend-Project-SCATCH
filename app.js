require("dotenv").config();
require("./config/mongoose-connection");
const express=require('express');
const app=express();
const userModel = require("./models/user-model");
// const cookieParser=require('cookie-parser');
 const path=require("path");

// const ownersRouter=require('./routes/ownersRouter');
// const productsRouter=require('./routes/productsRouter');
const usersRouter=require('./routes/usersRouter');
// const db=require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

// app.use("/owners",ownersRouter);
app.use("/",usersRouter);
// app.use("/products",productsRouter);

// app.get("/",(req,res)=>{
//     res.render("index");
// })
app.get("/create",async(req,res)=>{
    const createdUser=await userModel.create({
        fullname: "Prisha",
        email: "prisha@gmail.com",
        password: "12345"
    })
    res.send(createdUser);
})

app.listen(3000,()=>{
    console.log("server is running");
})
