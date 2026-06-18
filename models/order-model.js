const mongoose=require("mongoose");
const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    total:Number,
    createdAt:{
        type:Date,
        default:Date.now
    },
    

});
module.exports=mongoose.model("order",orderSchema);