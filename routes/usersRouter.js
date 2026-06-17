const express = require('express');
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
    res.render("index");
})

router.post("/register", async (req, res) => {
    const { fullname, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {

            const createdUser = await userModel.create({
                fullname,
                email,
                password: hash
            });
            res.redirect("/");
        });
    });
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) { return res.send("User not found"); }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {

    req.session.user = user._id;
    req.session.role = user.role;

    if(user.role === "admin"){
        res.redirect("/products/admin");
    }
    else{
        res.redirect("/products");
    }
}
        else { res.send("Incorect Password"); }
    });

});
router.get("/profile", isLoggedIn, async(req, res) => {
   const user=await userModel.findById(req.session.user);
   res.render("profile",{user});
});
router.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
        res.redirect("/");
    });
});


module.exports = router