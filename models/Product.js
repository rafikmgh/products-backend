var mongoose = require('mongoose')
var { ObjectId } = mongoose.Schema

var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  warranty_years: {
    type: Number,
    default: 0,
  },
  available: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date, // in min
    default: Date.now(),
  },
  updatedAt: {
    type: Date, // in min
    default: Date.now(),
  },
})

//index

productSchema.index(
  {
    name: 'text',
    type: 'text',
  },
  {
    weights: {
      type: 4,
      name: 5,
    },
  }
)

module.exports = Products = mongoose.model('biensproducts', productSchema)
