var express = require('express')
var router = express.Router()
var productRouter = require('./product')

router.use('/product',productRouter)

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router