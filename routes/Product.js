//requiring express server
var express = require('express')
//using express routing
var router = express.Router()
//express validator
const { check, validationResult } = require('express-validator')
//requiring controller
var productController = require('../controllers/Product')
//getting the auth middleware
const isAuth = require('../middleware/auth')

//create product route
router.post('/create', isAuth, productController.createProduct)
//update product route
router.post('/update/:productID', isAuth, productController.updateProduct)
//delete product route
router.delete('/delete/:productID', isAuth, productController.deleteProduct)
//get a single product route
router.get('/getById/:productID', isAuth, productController.getProductById)
//get all products route
router.get('/getAll', isAuth, productController.getAllProducts)

//exporting the express products router
module.exports = router
