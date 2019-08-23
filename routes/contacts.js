const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); // now can use second parameter in route to verify info
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route    GET api/contacts
// @desc     Get all users contacts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }) //take the userid from middleware (auth) and search for user contacts (sort -1; most recent first)
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post('/', (req, res) => {
    res.send('Add Contact');
});

// @route    POST api/contacts/:id
// @desc     Add new contact
// @access   Private
router.put('/:id', (req, res) => {
    res.send('Update Contact');
});

// @route    DELETE api/contacts/:id
// @desc     Add new contact
// @access   Private
router.delete('/:id', (req, res) => {
    res.send('Delete Contact');
});

module.exports = router;