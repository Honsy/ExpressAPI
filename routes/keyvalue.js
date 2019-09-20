var express = require('express')
var router = express.Router()
var keyvalueController = require('./../controller/keyvalue.controller')

// 查询keyValue 
router.get('',keyvalueController.queryKeyValue)
// 增加keyValue
router.post('',keyvalueController.addKeyValue)
// 修改KeyValue
router.put('',keyvalueController.updateKeyValue)
// 删除KeyValue
router.delete('',keyvalueController.deleteKeyValue)

module.exports = router