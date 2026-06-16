const mongoose=require('mongoose');



const userSchema=mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart:[{
       type: mongoose.Schema.Types.ObjectId,
       ref: "product"
 }],
    // isadmin: Boolean,
     orders:[{
     type: mongoose.Schema.Types.ObjectId,
    ref: "order"
     }],
    // contact: Number,
    // picture: String
});

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;