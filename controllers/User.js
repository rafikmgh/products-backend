//requiring jsonwebtoken
var jwt = require('jsonwebtoken')
//bcrypt js pour to hach passwords
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
//requiring User model
var User = require('../models/User')

//register function
var register = async (req, res) => {
  //errors verifications
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  //gathering data from the body
  const { firstName, lastName, email, password } = req.body

  try {
    let user = await User.findOne({ email })
    //verification if user exists
    if (user) {
      return res.status(401).json({ message: 'User already exists' })
    }

    //if not we can create new user object using User model

    user = new User({
      firstName,
      lastName,
      email,
      password,
    })

    // hashing the password before saving using bcrypt

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    //saving the new user into the database
    await user.save()

    // now we can generate the token after creating user using jwt

    const payload = {
      user: user._id,
    }

    await jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: '7d',
      },
      (error, token) => {
        if (error) throw error
        res.json({ token })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }

  //connecting into our app

  var login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //geting data from the body
    const { email, password } = req.body

    try {
      //verification if user exists in our database

      let user = await User.findOne({ email })
      if (!user) {
        //if not we can display invalid credentials
        return res.status(401).json({ message: 'Invalid Credentials' })
      }

      // generate token

      const payload = {
        user: user._id,
      }

      await jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: '7d',
        },
        (error, token) => {
          if (error) throw error
          res.json({ token })
        }
      )
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Server Error' })
    }
  }
}

//gathering the connected (curent user) data

var getCurrentUser = async (req, res) => {
  try {
    //getting the curent user data from database except the password
    let user = await User.findById(req.user).select('-password')
    return res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send('server error')
  }
}

module.exports = {
  register,
  login,
  getCurrentUser,
}
