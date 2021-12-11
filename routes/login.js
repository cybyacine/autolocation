var User = require('../models/user');
var express = require('express');
var router = express.Router();
const loginController = require('../controllers/login')
const isAuth = require("../config/isAuth");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render(
        'auth/login.twig',
        {
            title: "Login",
        }
    );
});

router.post('/', async function (req, res, next) {
    return await loginController.login(req, res, next);
});

router.post('/signup', async function (req, res, next) {
    return await loginController.signup(req, res, next);
});

router.get("/logout", isAuth, (req, res) => {
    req.session = null;
    res.clearCookie("session");
    res.clearCookie("session.sig");
    res.redirect("/login");
});
module.exports = router;
