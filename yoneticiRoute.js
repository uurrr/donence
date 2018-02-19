var express=require('express');
var router=express.Router();
var controller = require('./yoneticiController');

router.get('/',controller.yoneticiLoginController);
router.post('/',controller.yoneticiLoginPost);
router.get('/yoneticiPanel',controller.yoneticiPanelController);
router.get('/yoneticiYeniSube',controller.yoneticiYeniSubeController);
router.post('/yoneticiYeniSube',controller.yoneticiYeniSubePost);
router.get('/yoneticiSubeler',controller.yoneticiSubeListeleController);
router.get('/yoneticiMusteriler',controller.yoneticiMusteriListeleController);
router.get('/yoneticiSiparisler',controller.yoneticiSiparisListeleController);

module.exports = router;