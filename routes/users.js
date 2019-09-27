
var express = require('express');
var router = express.Router();
var userController = require('./../controller/user.app.controller')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 拉取用户信息 */
router.get('/info',userController.getInfo)

/* 登录 */
router.post('/login', userController.login);

/* 注册*/
router.post('/register', userController.register);

/* 小程序登录 */
router.get('/wxlogin', userController.wxlogin);


module.exports = router;
