const express = require('express');
const router = express.Router();
const { v4: uuidV4 } = require('uuid');
const { rawListeners } = require('../models/userModel');

router.get('/room', (req, res) => {
  const roomId = req.query.room ? req.query.room : uuidV4();
  res.redirect(`/room/${roomId}`);
});

router.get('/room/:room', (req, res) => {
  const name = (req.user)?  req.user.name : "";
  res.render('room', { 
    roomId: req.params.room,
    name : name
  });
});

module.exports = router;