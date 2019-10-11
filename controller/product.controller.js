var csql = require('./../sql/sql')
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
            res.send(util.successCode(null,'添加成功'))
            res.end()
            db.close(connection);

        }).catch(err=>{
            console.log(err)
            res.send(util.errorCode(400,null,'添加失败'))
            res.end()
            db.close(connection);
        })
        return;
    },
    // 查询商品
    queryProduct:async function(req,res,next) {
        let params = req.params
        let connection = db.connection()
        var currentPage = Number(params.page)
        var pageNumber = Number(params.count)

        var resultcount = await util.selectTableCount('product')
        var totalcount = resultcount[0]['COUNT(*)']
        var totalpage = Math.ceil(totalcount/pageNumber)

        // 查询
        db.insert(connection,productsql.queryAll,[(currentPage-1)*pageNumber,pageNumber]).then(result=>{
            
            // 携带分页参数
            var resjson = {
                list:result,
                page:{
                    currentPage:currentPage,
                    pageNumber:pageNumber,
                    totalNumer:totalcount,
                    totalPage:totalpage
                }
            }

            res.send(util.successCode(resjson));
            res.end()
            db.close(connection);
        }).catch(error=>{
            res.send(util.errorCode(500,error,"服务器错误！"))
            res.end()
            db.close(connection);
        })
        db.close(connection);
        return;
    },
    // 修改商品
    updateProduct:function(req,res,next){
        let params = req.body
        let connection = db.connection()

        ormObject = Object.assign(product,params)
        // 创建人
        ormObject.create = "洪少远"

        var id = ormObject.id
        delete(ormObject["id"]);

        db.insert(connection,productsql.updateProduct,[ormObject,id]).then(result=>{
            console.log(res)
            res.send(util.successCode(null,'添加成功'))
            res.end()
            db.close(connection);

        }).catch(err=>{
            console.log(err)
            res.send(util.errorCode(400,null,'添加失败'))
            res.end()
            db.close(connection);

        })
        return;
    },
    // 删除某件商品
    deleteProduct:function(req,res,next){
        let id = req.body.id
        let connection = db.connection()

        db.insert(connection,productsql.deleteProduct,[id]).then(result=>{
            res.send(util.successCode(null,'删除成功'))
            res.end()
            db.close(connection);
        }).catch(err=>{
            res.send(util.errorCode(400,null,'删除失败'))
            res.end()
            db.close(connection);
        })
        return;
    },
    // 下架商品
    removeProduct:function(req,res,next){
        let id = req.body.id
        let connection = db.connection()

        db.insert(connection,productsql.removeProduct,[id]).then(result=>{
            res.send(util.successCode(null,'下架成功'))
            res.end()
            db.close(connection);
        }).catch(err=>{
            res.send(util.errorCode(400,null,'下架失败'))
            res.end()
            db.close(connection);
        })
        return;
    }
}