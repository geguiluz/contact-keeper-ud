const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET api/contacts
// @desc      Get all contacts for user
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    // Get contacts ordered by date. Most recent first

    // Since we're using the auth middleware, we get access to the user
    // console.log(req.user);
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    // console.log(contacts);
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private

router.put('/', (req, res) => {
  res.send('Update contact');
});

// @route     DELETE api/contacts/:id
// @desc      Update contact
// @access    Private

router.delete('/', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
