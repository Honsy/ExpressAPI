
const mysql = require('mysql')
var express = require('express');
var router = express.Router();
var db = require('../config/db')
var user = require('../config/user')
var util = require('./../util')


var connection = mysql.createConnection(db.mysql)
try {
  connection.connect()
} catch (error) {
  console.log(error)
}

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 拉取用户信息 */
router.get('/info',function(req,res,next){
    let token = req.get('X-Token')
    var username = util.aesDecrypt(token)
    connection.query(user.queryUser,[username],(err,result)=>{
      // 如果查无此人
      if(result.length == 0){
        res.send(util.errorCode(401,err,"用户不存在"))
        res.end()
        return;
      }
      var user = result[0]
      res.send(util.successCode(user,""))
      res.end()

    })

    
})

/* 登录 */
router.post('/login', function(req, res, next) {
  let params = req.body
  connection.query(user.queryUser,[params.username],(err,result)=>{
    if (result.length==0) {
      res.send(util.errorCode(401,err,"用户名密码错误！"))
      res.end()
    }else{
      var password = util.md5(params.password)
      // var password = params.password
      var user = result[0]
      user.token = util.aesEncrypt(params.username)
      if (user.password == password) {
        res.send(util.successCode(user,"登录成功！"))
        res.end()
      }else{
        res.send(util.errorCode(401,err,"用户名密码错误！"))
        res.end()
      }
    }
  })
});



/* 注册*/
router.post('/register', function(req, res, next) {
  let params = req.body
  connection.query(user.queryUser,[params.username],(err,result)=>{
    if (result.length==0) {
      connection.query(user.insert,[params.username,password],(err,result)=>{
        if (!err) {
          res.send(util.successCode(null,'注册成功！'))
          res.end()

        }else{
          res.send(util.errorCode(500,err,"服务器错误！"))
          res.end()

        }
      })
    }else{
      res.send(util.errorCode(300,null,"用户已存在！"))
      res.end()
    }
  })
  // connection.query(user.insert,[params.username,params.password],(err,result)=>{
  //     console.log(err,result)
  // })
  // res.send(params);
});

module.exports = router;
