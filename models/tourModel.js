const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must be contain only charecter'],
    },

    slug: String,

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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },

    price: { type: Number, required: [true, 'A Tour must have a price'] },

    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price; // 200 < 250
        },
        message: 'Discounted price ({VALUE}) should be below the reqular price',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },

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
      select: false, // HIDING DATA
    },

    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      discription: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        discription: String,
        day: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

toursSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
toursSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
// toursSchema.pre('find', function (next) {
toursSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

toursSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
