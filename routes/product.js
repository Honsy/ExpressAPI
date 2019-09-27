
var express = require('express')
var router = express.Router()
var productController = require('./../controller/product.controller')

// 查询全部商品
router.get('', productController.queryProduct);

// 增加某个商品
router.post('',productController.addProduct)

// 修改某个商品
router.put('',function(req,res,next){

})

// 删除某个商品
router.delete('',function(req,res,next){

})

module.exports = router