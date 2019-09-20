var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var keyvalueRouter = require('./keyvalue');

// 前台用户
router.use('/users', usersRouter);
// 通用KeyValue查询
router.use('/keyvalue', keyvalueRouter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
