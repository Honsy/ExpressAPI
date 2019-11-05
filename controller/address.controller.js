var db = require('./../config/db')
var util = require('./../util')
var userSql = require('./../sql/user.app.sql')
var addressModel = require('./../model/address')
var addressSql = require('./../sql/address.sql')

module.exports = {
    // 增加收货地址
    addAddress:async function(req,res,next){
        let token = req.get('X-Token')
        var username = util.aesDecrypt(token)
        let connection = db.connection()
        addressModel = Object.assign(addressModel,req.body)
        try {
            let result = await util.getUserWithUsername(connection,username)
            var user = result[0]
            addressModel.uid = user.id
            
            db.insert(connection,addressSql.addAddress,[addressModel.uid,addressModel.linkman,addressModel.phone,addressModel.pca,addressModel.detail,addressModel.isdefault]).then(result=>{
                res.send(util.successCode(null,'添加成功'))
                res.end()
            }).catch(err=>{
                res.send(util.errorCode(500,null,'添加地址错误'))
                res.end()
            }) 
        } catch (error) {
            res.send(util.errorCode(400,null,'用户不存在'))
            res.end()
        }
        db.close(connection)
        return;
    },
    //查询收货地址
    queryAddress:async function(req,res,next){
        let token = req.get('X-Token')
        var username = util.aesDecrypt(token)
        let connection = db.connection()
        try {
            let result = await util.getUserWithUsername(connection,username)
            var user = result[0]
            
            db.insert(connection,addressSql.queryAddress,[user.id]).then(result=>{
                res.send(util.successCode(result,'查询成功'))
                res.end()
            }).catch(err=>{
                res.send(util.errorCode(500,null,'查询失败'))
                res.end()
            }) 
        } catch (error) {
            res.send(util.errorCode(400,null,'用户不存在'))
            res.end()
        }
        db.close(connection)
        return;
    },
    //删除收货地址
    deleteAddress(req,res,next){

    },
    //修改收货地址
    updateAddress(req,res,next){

    }
}