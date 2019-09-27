var express = require('express')
var shopcartRouter = express.Router()
var shopcartController = require('./../controller/shopcart.controller')

// 查询当前用户的购物车
shopcartRouter.get('',shopcartController.getShopCart)
// 添加商品进入购物车
shopcartRouter.post('',shopcartController.addShopCart)
// 删除购物车商品
shopcartRouter.delete('',shopcartController.deleteShopCart)

// 更新购物车数量
shopcartRouter.post('/updateNum',shopcartController.updateShopCartNum)

module.exports = shopcartRouter

