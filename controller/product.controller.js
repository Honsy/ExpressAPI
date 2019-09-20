var product = require('./../model/product')
var productsql = require('./../sql/product.sql')
var db = require('./../config/db')
var util = require('./../util')


module.exports = {
    // 添加商品
    addProduct:function(req,res,next){
        let params = req.body
        let connection = db.connection()

        ormObject = Object.assign(product,params)
        // 创建人
        ormObject.create = "洪少远"

        db.insert(connection,productsql.addProduct,ormObject).then(result=>{
            console.log(res)
            res.send('succ'),
            res.end()
        }).catch(err=>{
            console.log(err)
            res.send('err'),
            res.end()
        })
 
        db.close(connection);
        return;
    },
    // 查询商品
    queryProduct:function(req,res,next) {
        let params = req.body
        let connection = db.connection()

        db.insert(connection,productsql.queryAll).then(result=>{
            res.send(util.successCode(result));
            res.end()
        }).catch(error=>{
            console.log(error)
            res.send(util.errorCode(500,error,"服务器错误！"))
            res.end()
            return;
        })
        db.close(connection);
        return;
    }
}