const express = require('express');
const router = express.Router()
const passport = require('../config/passport-config.js');


const { handleLogin, handleLogout, isLoggedIn } = require("../controllers/auth.js")

router.post('/login', passport.authenticate("local", {}), handleLogin);
router.delete('/logout', handleLogout);
router.get('/isLoggedIn', isLoggedIn);

module.exports = router;