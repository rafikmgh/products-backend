//requiring mongoose
const { default: mongoose } = require('mongoose')

//geting our Product model
var Product = require('../models/Product')

/****create a product (gathering data from the body)****/

var createProduct = async (req, res) => {
  //body data
  const { name, type, rating, warrenty_years, available, price } = req.body

  //init object to put the body data
  const productFields = {}

  if (name) productFields.name = name
  if (type) productFields.type = type
  if (price) productFields.price = price
  if (rating) productFields.rating = rating
  if (warrenty_years) productFields.warrenty_years = warrenty_years
  if (available != null && available != undefined)
    productFields.available = available

  //add the body fields to the new product object
  try {
    let product = new Product({
      ...productFields,
    })

    //save the created product into the database
    await product.save()

    return res.json({ product })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'SERVERERROR' })
  }
}

//updating an existing product from the database
var updateProduct = async (req, res) => {
  const { name, type, rating, warrenty_years, available, price } = req.body

  const productFields = {}

  if (name) productFields.name = name
  if (type) productFields.type = type
  if (price) productFields.price = price
  if (rating) productFields.rating = rating
  if (warrenty_years) productFields.warrenty_years = warrenty_years
  if (available != null && available != undefined)
    productFields.available = available

  try {
    //finding the product using mongoose and updating it (also saving it)
    let product = await Product.findByIdAndUpdate(
      req.params.productID,
      { $set: productFields },
      { new: true }
    )

    return res.json({ product })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'SERVERERROR' })
  }
}

//deleting a product

var deleteProduct = async (req, res) => {
  try {
    //finding it / deleting it / saving
    await Product.findByIdAndDelete(req.params.productID)

    return res.json({ message: 'Product deleted' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'SERVERERROR' })
  }
}

//get a single product
var getProductById = async (req, res) => {
  try {
    //  IF WE HAD mongodb ids
    //  let product = await Product.findById(mongoose.Types.ObjectId(req.params.productID));

    let product = await Product.findOne({
      _id: req.params.productID,
    })

    return res.json({ product })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'SERVERERROR' })
  }
}

//get all the products from database
var getAllProducts = async (req, res) => {
  try {
    let products = await Product.find()

    return res.json({ products })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'SERVERERROR' })
  }
}

//exporting all the created functions
module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
}
