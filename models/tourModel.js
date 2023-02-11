const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must have a name'],
    unique: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: [true, 'A Tour must have a duration'],
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have group size'],
  },

  difficulty: {
    type: String,
    required: [true, 'A Tour must have difficulty'],
  },

  price: { type: Number, required: [true, 'A Tour must have a price'] },

  priceDiscount: Number,

  ratingsAverage: { type: Number, default: 4.5 },

  ratingsQuantity: { type: Number, default: 0 },

  summary: {
    type: String,
    trim: true,
    required: [true, 'A Tour must have (discription) summary'],
  },

  description: {
    type: String,
    trim: true,
  },

  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },

  images: [String],

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  startDates: [Date],
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
