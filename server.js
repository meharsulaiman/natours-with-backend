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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is starting on http://localhost:${port}`);
});
