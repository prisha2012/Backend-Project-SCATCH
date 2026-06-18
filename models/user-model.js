const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    role:{
       type:String,
       default:"user"
    },
    cart:[{
      product:{   
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
      },
      quantity:{
        type:Number,
        default:1
      }
 }],
     orders:[{
     type: mongoose.Schema.Types.ObjectId,
     ref: "order"
     }]
});

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;