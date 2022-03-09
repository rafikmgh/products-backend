//using express server
var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator')

var userController = require('../controllers/User')

router.post(
  '/register',
  [
    //email validation
    check('email', 'Email is invalid').isEmail(),
    //password validation minimum length is 8 caracters
    check('password', 'Please insert a valid password > 8 car').isLength({
      min: 8,
    }),
  ],
  //register
  userController.register
)

router.post(
  '/login',
  [
    //email validation
    check('email', 'Email is invalid').isEmail(),
    //password validation
    check('password', 'Please insert a valid password > 6 car').isLength({
      min: 6,
    }),
  ],
  //login
  userController.login
)

//curerount user
router.get('/me', userController.getCurrentUser)

//export the users router
module.exports = router
