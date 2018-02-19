var express=require('express');
var router=express.Router();
var controller = require('./musteriController');

router.get('/',controller.musteriLoginController);
router.get('/musteriAlisveris',controller.musteriAlisverisController);
router.get('/musteriSignup',controller.musteriSignupController);
router.post('/musteriSignup',controller.musteriSignupPost);
router.post('/',controller.musteriLoginPost);

module.exports = router;