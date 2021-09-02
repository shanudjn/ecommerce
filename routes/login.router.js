const express = require('express');
const router = express.Router();

const { User } = require('../models/user.model');


router.route('/')
  .get(async (req, res) => {
    try {
      const user = await User.find({})
      res.status(200).send({ success: true, user })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const { name, password } = req.body;

      const registeredUser = await User.find({ name: name, password: password })
      res.status(200).json({ registeredUser: registeredUser })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  })

module.exports = router;