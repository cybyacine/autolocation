let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    return res.redirect("/login");
});
router.get('/dashboard', async function (req, res, next) {
    res.render('dashboard');
});

module.exports = router;
