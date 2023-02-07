const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './congif.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch(() => {
    console.log('DB is in problem');
  });

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

const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is starting on http://localhost:${port}`);
});
