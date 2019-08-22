const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); // now can use second parameter in route to verify info

const User = require('../models/User');

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post('/', [
    check('name', 'Please include name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
    ], 
    async (req, res) => {
      const errors = validationResult(req) // validationResult check for errors in req
      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() }) //method that will send an error of errors
      }
      const { name, email, password } = req.body;

      try {
          let user = await User.findOne({ email });  //check to see if username is already taken

          if(user) {
              return res.status(400).json({ msg: 'User already exists' });
          }

          user = new User({ //create new user since above came back false
              name: name,
              email: email,
              password: password
          });
          
          const salt = await bcrypt.genSalt(10) //encrypt password with bcrypt with method genSalt 10 is encryption level
      }
    });
    

module.exports = router;
