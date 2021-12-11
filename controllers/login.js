let User = require('../models/user');
const bcrypt = require('bcrypt');

async function login(req, res, next) {
    try {
        const {
            email,
            password,
        } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.render('auth/login.twig', {error: 'login failed'});
        }

        const validPw = bcrypt.compareSync(password, user.password);
        if (!validPw) {
            return res.render('auth/login.twig', {error: 'password incorrect'});
        }
        req.session.userId = user._id;
        return res.redirect('/brands');
    } catch (e) {
        console.error(e);
        return res.render('auth/login.twig', {error: 'error'});
    }
}

async function signup(req, res, next) {
    try {
        const {
            email,
            full_name,
            password,
            age,
            phone,
            address
        } = req.body;
        let user = await User.findOne({email});
        if (user) {
            return res.render('auth/login.twig', {error: 'user exist'});
        }
        user = new User({
            email,
            password,
            full_name,
            age,
            phone,
            address
        });
        await user.save();

        return res.redirect('/login');
    } catch (e) {
        console.error(e);
        return res.render('auth/login.twig', {error: 'error'});
    }
}

module.exports = {
    login,
    signup,
}
