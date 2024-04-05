const express = require("express");
const router = express.Router();
const passport = require("passport");

//ruta de registro
router.post("/register", passport.authenticate("register"), async (req, res) => {
    
    if(!req.user) return res.status(401).send({message: "Credenciales invalidas"});
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };

    req.session.login = true;
    res.redirect("/login");
});

//login
router.post("/login", passport.authenticate("login"), (req, res) => {
    if(!req.user) return res.status(401).send({message: "Credenciales invalidas"});
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };

    req.session.login = true;
    res.redirect("/");
    
});

//logout
router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    };
    res.redirect("/login");
});

//ruta para el profile
router.get("/profile", (req, res) => {
    if (req.session.user) {
        res.render("profile", {user: req.session.user});
    } else {
        res.redirect("/login");
    };
});

module.exports = router;