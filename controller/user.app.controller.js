var product = require('./../model/product')
var user = require('./../sql/user.app.sql')
var db = require('./../config/db')
var util = require('./../util')

// 前台用户
module.exports = {

    // 小程序登录
    wxlogin:function(req,res,next){
        let params = req.query
        
        res.send(params)
        res.end()
    },

    // 前台登录
    login:function(req,res,next){
        let params = req.body
        let connection = db.connection()

        db.insert(connection,user.queryUser,[params.username]).then(result=>{
            if (result.length==0) {
                res.send(util.errorCode(401,null,"用户名密码错误！"))
                res.end()
                db.close(connection)

              }else{
                var password = util.md5(params.password)
                // var password = params.password
                var user = result[0]
                user.token = util.aesEncrypt(params.username)
                if (user.password == password) {
                  res.send(util.successCode(user,"登录成功！"))
                  res.end()
                  db.close(connection)
                }else{
                  res.send(util.errorCode(401,null,"用户名密码错误！"))
                  res.end()
                  db.close(connection)

                }
              }
        }).catch(err=>{
            res.send(util.errorCode(401,err.message,"服务端错误！"))
            res.end()
            db.close(connection)

        })
        return;

    },

    // 前台注册
    register:function(req,res,next){
        let params = req.body
        let connection = db.connection()

        db.insert(connection,user.queryUser,[params.username]).then(result=>{
            if (result.length==0) {
                db.insert(connection,user.insert,[params.username,params.password]).then(result=>{
                    res.send(util.successCode(null,'注册成功！'))
                    res.end()
                }).catch(err=>{
                    res.send(util.errorCode(500,err,"服务器错误！"))
                    res.end()
                })
              }else{
                res.send(util.errorCode(300,null,"用户已存在！"))
                res.end()
              }
        }).catch(err=>{
            res.send(util.errorCode(401,err,"服务端错误！"))
            res.end()
        })

        db.close()
        return;
    },

    // 拉取用户信息
    getInfo:function(req,res,next){
        let token = req.get('X-Token')
        var username = util.aesDecrypt(token)

        let connection = db.connection()

        db.insert(connection,user.queryUser,[username]).then(result=>{
            // 如果查无此人
            if(result.length == 0){
                res.send(util.errorCode(401,err,"用户不存在"))
                res.end()
                return;
            }
            var user = result[0]
            res.send(util.successCode(user,""))
            res.end()
        }).catch(err=>{
            res.send(util.errorCode(401,err,"服务端错误！"))
            res.end()
        })

        db.close()
        return;
    }
}