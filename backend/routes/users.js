var express = require('express');
var router = express.Router();

var authControler = require('../controllers/authController')
const authMiddleware = require('../middleware/auth-middleware')
router.post('/createUser',authControler.createUser);

router.post('/loginUser',authControler.loginUser);

router.get('/user',authMiddleware,authControler.user);

router.get('/getsingleUser/:id',authControler.getsingleUser);


module.exports = router;
