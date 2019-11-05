
var express = require('express')
var router = express.Router()
var productController = require('./../controller/product.controller')

// 查询全部商品
router.get('/:page/:count', productController.queryProduct);
// 查询单个商品详情
router.get('/:id', productController.queryOneProduct);
// 增加某个商品
router.post('',productController.addProduct)
// 修改某个商品
router.put('',productController.updateProduct)
// 彻底删除某个商品
router.delete('',productController.deleteProduct)
// 下架某个商品
router.post('/remove',productController.removeProduct)

module.exports = router