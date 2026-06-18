module.exports = function(req,res,next){

    res.locals.userId = req.session.user;

    res.locals.role = req.session.role;

    next();

}