module.exports=function(req,res,next){
    if(req.session.role!=="admin"){
        return res.send("Access Denied");
    }
    next();
}