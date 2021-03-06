var querystring = require('querystring');
var express = require('express');
var router = express.Router();
var multer = require('multer')
var usersRouter = require('./users');
var keyvalueRouter = require('./keyvalue');
var productRouter = require('./product')
var shopcartRouter = require('./shopcart')
var addressRouter = require('./address')

var axios = require('axios')
var util = require('./../util')
var config = require('./../config')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

var upload = multer({storage:storage})

// 前台用户
router.use('/users', usersRouter);
// 通用KeyValue查询
router.use('/keyvalue', keyvalueRouter);
// 商品查询
router.use('/product',productRouter)
// 购物车相关
router.use('/shopcart',shopcartRouter)
// 收货地址
router.use('/address',addressRouter)


// 请求sm.ms图床Token
router.post('/smlogin',function(req,res,next){
  axios.post('https://sm.ms/api/v2/token',querystring.stringify({username:'hsytea',password:'qq123456'})).then(response=>{
      const { data } = response
      console.log(response)

      if (data.success) {
          res.send(util.successCode(data.data))
          res.end()
      } else {
          res.send(util.errorCode(400))
          res.end()
      }        
  }).catch(err=>{
      console.log(err)
      res.send(util.errorCode(400,null,'SM连接失败'))
      res.end()
  })

})
// 接受图片上传
router.post('/upload',upload.single('file'),function(req,res,next){
  res.send(util.successCode(config.staticImageUrl+req.file.filename))
  res.end()
  //     var fd = new FormData()
  //     // fd.append('smfile',req.file.buffer,{filename:req.file.originalname,contentType:req.file.mimetype})
  //     fd.append('smfile',req.file.buffer)
  
  // axios.post('https://sm.ms/api/v2/upload',fd,{headers:{'Content-Type': 'multipart/form-data'}}).then(response=>{
  //     console.log(response)
  // }).catch(err=>{
  //     console.log(err)
  // })
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
