//requiring express server
var express = require('express')
//using express routing
var router = express.Router()
//express validator
const { check, validationResult } = require('express-validator')
//requiring controller
var productController = require('../controllers/Product')

//create product route
router.post('/create', productController.createProduct)
//update product route
router.post('/update/:productID', productController.updateProduct)
//delete product route
router.delete('/delete/:productID', productController.deleteProduct)
//get a single product route
router.get('/getById/:productID', productController.getProductById)
//get all products route
router.get('/getAll', productController.getAllProducts)

//exporting the express products router
module.exports = router
