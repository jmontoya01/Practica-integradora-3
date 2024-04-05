const express = require("express");
const router = express.Router();

//rutas para el renderizado
router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/profile", (req, res) => {
    res.render("profile", { user: req.session.user });
});


module.exports = router;