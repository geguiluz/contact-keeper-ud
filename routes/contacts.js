const express = require('express');
const router = express.Router();

// @route     GET api/contacts
// @desc      Get contacts for user
// @access    Private

router.get('/', (req, res) => {
  res.send('Getting contacts');
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
