var User = require('../models/user');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find(
        (err, user) => {
            res.render(
                'login.twig',
                {
                    title: "Login",
                }
            );
        }
    );
});

router.post('/', async function (req, res, next) {

    const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        }
    );

    if (user) {
        res.redirect('/contacts');
    } else {
        res.render(
            'login.twig',
            {
                title: "Login",
                error: "Login failed",
            }
        );
    }
});

module.exports = router;
