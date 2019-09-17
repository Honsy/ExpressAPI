var express = require('express')
var router = express.Router()


// 查询全部商品
router.get('', function(req, res, next) {
    res.send('respond wi1232th a resource');
});

// 增加某个商品
router.post('',function(req,res,next){

})

// 修改某个商品
router.put('',function(req,res,next){

})

// 删除某个商品
router.delete('',function(req,res,next){

})

module.exports = router