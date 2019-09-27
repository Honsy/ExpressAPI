const express = require('express')
const router = express.Router()
var homeController = require('./../controller/home.controller')

router.get('',homeController.getIndex)

export default router