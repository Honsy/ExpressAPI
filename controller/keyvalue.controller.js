
var db = require('./../config/db')
var keyvaluesql = require('./../sql/keyvalue.sql')
var util = require('./../util')

module.exports = {
    queryKeyValue:function(req,res,next) {
        let params = req.body
        let connection = db.connection()
        // 区分部分和条件查询
        console.log('asdaaaasad')

        // db.insert(connection,keyvaluesql.queryAll).then(result=>{                
        //     res.send(util.successCode(result))
        //     return;

        // }).catch(err=>{
        //     console.log(res)
        //     console.log(err)

        //     res.send(util.errorCode(500,err,"服务器错误！"))
        //     return;
        // })
        res.send(util.errorCode(500,err,"服务器错误！"))
        return;
        db.close()
        return;
    },
    // 增加KeyValue
    addKeyValue:function(req,res,next) {
        
        res.send('asd')
        res.end()
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