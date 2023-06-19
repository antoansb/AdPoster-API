const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter Ad title'],
      maxLength: 20,
    },
    description: {
      type: String,
      required: [true, 'Please enter Ad description'],
      maxLength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ad', AdSchema);
