const express = require('express');
let router = express.Router();
let User = require('../models/user');
const userController = require('../controllers/users')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await userController.allUsers();
  res.render('users/index', {users});
});
router.post('/delete/:id', async function (req, res, next) {
  await userController.deleteUser(req.params.id);
  res.redirect('/users');
});

router.get('/search', async function(req, res, next) {
  let users = await userController.search(req.query.search);
  res.render('users/index', {users, search: req.query.search});
});
module.exports = router;
