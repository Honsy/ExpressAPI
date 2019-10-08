var util = require('./../util')
var db = require('./../config/db')
var userSql = require('./../sql/user.app.sql')
var shopcartSql = require('./../sql/shopcart.sql')

var shopcart = require('./../model/shopcart')

module.exports = {
    // 查询购物车
    getShopCart:function(req,res,next){
        let token = req.get('X-Token')
        var username = util.aesDecrypt(token)
        let connection = db.connection()

        // 查询用户
        db.insert(connection,userSql.queryUser,[username]).then(result=>{
            var user = result[0]

            db.insert(connection,shopcartSql.queryShopcartWithUid,[user.id]).then(result=>{
                res.send(util.errorCode(200,result,'请求成功！'))
                res.end()
                db.close(connection)
            }).catch(err=>{
                res.send(util.errorCode(402,result,'服务器错误！'))
                res.end()
                db.close(connection)
            })

        }).catch(err=>{
            res.send(util.errorCode(401,err,'服务器错误！'))
            res.end()
            db.close(connection)
        })
    },
    // 添加商品进入购物车
    addShopCart:function(req,res,next){
        console.log(req)
        var params = req.body
        let token = req.get('X-Token')
        var username = util.aesDecrypt(token)
        let connection = db.connection()
        shopcart = Object.assign(shopcart,params)

        // 查询用户
        db.insert(connection,userSql.queryUser,[username]).then(result=>{
            var user = result[0]
            shopcart.uid = user.id
            // 查找该用户是否有该商品
            db.insert(connection,shopcartSql.queryShopcartWithUidAndProduct,[shopcart.uid,shopcart.productid]).then(result=>{
                
                if (result.length>0) {
                    // 找到
                    res.send(util.errorCode(403,null,'请勿重复添加！'))
                    res.end()
                    db.close(connection)
                } else {
                    // 未找到 插入
                    db.insert(connection,shopcartSql.insertSql,[shopcart.uid,shopcart.productid,shopcart.num,shopcart.status]).then(result=>{
                        console.log(result)
                        res.send(util.successCode(null,'添加成功！'))
                        res.end()
                        db.close(connection)
                    }).catch(err=>{
                        res.send(util.errorCode(400,err,'添加失败！'))
                        res.end()
                        db.close(connection)
                    })  
                }
            }).catch(err=>{
                // 未找到 插入
                res.send(util.errorCode(401,err,'服务器错误！'))
                res.end()
                db.close(connection)
            })
        }).catch(err=>{
            res.send(util.errorCode(401,null,'服务器错误！'))
            res.end()
            db.close(connection)
        })
    },
    // 删除商品购物车
    deleteShopCart:function(req,res,next){

    },
    //更新购物车数量
    updateShopCartNum:function(req,res,next){

    } 
}