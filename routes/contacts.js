const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); // now can use second parameter in route to verify info
const auth = require('../middleware/auth');

const Contact = require('../models/contact');

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
router.post('/', [ auth, [
  check('name', 'Name is required').not().isEmpty()
] ], async (req, res) => {  //auth and express validator must both be used as middleware, so []'s must be used
    const errors = validationResult(req) // validationResult check for errors in req
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }) //method that will send an error of errors
    }

    const { name, email, phone, type } = req.body;
   
    try {
      const newContact = new Contact({
          name: name,
          email: email,
          phone: phone,
          type: type,
          user: req.user.id //we get this from token (auth middleware)
      });

          const contact = await newContact.save(); // 'save' new contact to database and await response

          res.json(contact); //return contact to client
    } catch {
          res.status(500).send('Server Error');
    }

});

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    //Build a contact object based on above submitted contact info
    const contactFields = {};
    //check to see if all of these fields are included before adding to object
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(400).json({ msg: "contact not found" });

        //Make suer user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized"})
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set: contactFields }, //update fields with object that we created above (contactFields) lines: 60-65
            { new: true }); // if contact does exist just create a new one

            res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/contacts/:id
// @desc     Add new contact
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(400).json({ msg: "contact not found" });

        //Make suer user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized"})
        }

        await Contact.findByIdAndRemove(req.params.id);

            res.json({ msg: 'contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;