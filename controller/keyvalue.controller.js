
var db = require('./../config/db')
var keyvalue = require('./../model/keyvalue')

var keyvaluesql = require('./../sql/keyvalue.sql')
var util = require('./../util')

module.exports = {
    queryKeyValue:function(req,res,next) {
        let params = req.query
        let connection = db.connection()

        // 区分全部和条件查询
        if (!params.type) {
            db.insert(connection,keyvaluesql.queryAll).then(result=>{                
                res.send(util.successCode(result))
                return;
            }).catch(err=>{
                res.send(util.errorCode(500,err,"服务器错误！"))
                return;
            })
        } else {
            db.insert(connection,keyvaluesql.queryType,[params.type]).then(result=>{                
                res.send(util.successCode(result))
                console.log(result)
                return;
            }).catch(err=>{
                res.send(util.errorCode(500,err,"服务器错误！"))
                return;
            })   
        }
        db.close(connection)
        return;
    },
    // 增加KeyValue
    addKeyValue:function(req,res,next) {
        console.log(req.body)
        let params = req.body
        let connection = db.connection()

        ormObject = Object.assign(keyvalue,params)
        console.log(ormObject)

        // 查询当前type类型的value是否存在
        db.insert(connection,keyvaluesql.queryKeyValue,[ormObject.type,ormObject.value]).then(result=>{
            if (result.length == 0) {
                db.insert(connection,keyvaluesql.addKeyValue,ormObject).then(result=>{
                    res.send(util.successCode(null,'成功'))
                    res.end()
                    db.close(connection)
                    return;
                }).catch(err=>{
                    res.send(util.errorCode(501,err,"插入错误！"))
                    res.end()
                    db.close(connection)
                    return;
                })
            } else {
                res.send(util.errorCode(400,null,"该类型值已存在，请更换!"))
                res.end()
                db.close(connection)
                return;
            }
        }).catch(error=>{
            res.send(util.errorCode(500,error,"查询错误！"))
            res.end()
            db.close(connection)
            return;
        })
        return;
    },
    // 删除KeyValue
    deleteKeyValue:function(req,res,next){
        res.send('asd')
        res.end()
    },
    // 修改KeyValue
    updateKeyValue:function(req,res,next){
        res.send('asd')
        res.end()
    }
}