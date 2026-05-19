const { FunctionCallingMode } = require('firebase/ai');
const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:2701/scatch")
.then(function(){
    console.log("connected")
})
.catch(function(err){
    console.log(err);
})

module.exports=mongoose.connection;
