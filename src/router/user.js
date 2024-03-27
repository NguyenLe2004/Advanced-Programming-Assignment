const user = require("../controller/user")
const router = require("express").Router();

// Login for user
router.post('/login',user.loginUser);

module.exports = router;