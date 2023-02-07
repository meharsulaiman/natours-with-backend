const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must have a name'],
    unique: true,
  },
  price: { type: Number, required: [true, 'A Tour must have a price'] },
  rating: { type: Number, default: 4.5 },
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
