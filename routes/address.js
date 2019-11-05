var express = require('express')
var addressController = require('./../controller/address.controller')
var util = require('./../util')
var router = express.Router()

// 查询
router.get('',addressController.queryAddress)
// 增加
router.post('',addressController.addAddress)
// 修改
router.put('',addressController.updateAddress)
// 删除
router.delete('',addressController.deleteAddress)

module.exports = router
