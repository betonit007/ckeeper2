const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // now can use second parameter in route to verify info
const config = require('config');

const User = require('../models/User');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', (req, res) => {
    res.send('Get logged in user');
});

// @route    POST api/auth
// @desc     Auth user and get token
// @access   Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),  //using express-validator to verify email and password are present
  check('password', 'Password is required').exists()
], 
    async (req, res) => {
        const errors = validationResult(req) // validationResult check for errors in req
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }) //method that will send an error of errors
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email }); //check to see if user exists in db (search by email)

            if(!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' }) // if user doesn't exist send error
            }

            const isMatch = await bcrypt.compare(password, user.password); //use bycrypt to see if password returned from database matches password entered by user

            if(!isMatch) { // if no match send error back to user
              return res.status(400).json({ msg: 'Invalid Credentials' })
            }
            // run below if there is a match
            jwt.sign({ user: {id: user.id }}, config.get('jwtSecret'), { //pass in an object with user id to create webtoken with jsonwebtoken
                expiresIn: 360000                                         // a secret must also be passed into sign (it can be whatever you want (store in config.get() from config npm))
              }, (err, token) => {
                  if (err) throw err;
                  res.json({ token })
              })  
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

module.exports = router;