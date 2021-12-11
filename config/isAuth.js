//Check users log
module.exports = isAuth = (req, res, next) => {
    if (!res.locals.user) {
        return res.redirect("/login");
    }
    next();
};
