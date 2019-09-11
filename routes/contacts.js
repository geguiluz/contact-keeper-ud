const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET api/contacts
// @desc      Get contacts for user
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    // Get contacts ordered by date. Most recent first
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private

router.post('/', (req, res) => {
  res.send('Add new contact');
});

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
