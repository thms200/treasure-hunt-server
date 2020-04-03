const mongoose = require('mongoose');

const treasureSchema = new mongoose.Schema({
  registered_by: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'usim',
      'transportaion',
      'show',
      'ticket',
      'coupon',
      'etc'
    ],
  },
  name: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
  location: {
    type: Array,
    required: true,
  },
  location_picture_url: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  is_hunting: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Treasure', treasureSchema);
