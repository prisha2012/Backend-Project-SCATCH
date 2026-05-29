const mongoose=require('mongoose');


const productSchema=mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    bgcolor: String,
    panelcolor: String,
    textcolor: String
});

const productModel=mongoose.model("product",productSchema);

module.exports=productModel;