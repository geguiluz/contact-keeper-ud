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

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build the contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.name = email;
  if (phone) contactFields.name = phone;
  if (type) contactFields.name = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user does own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // { new: true } ----- This option allows us to create if it doesn't exist
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/contacts/:id
// @desc      Update contact
// @access    Private

router.delete('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build the contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.name = email;
  if (phone) contactFields.name = phone;
  if (type) contactFields.name = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user does own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // { new: true } ----- This option allows us to create if it doesn't exist
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
