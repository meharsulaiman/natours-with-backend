const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTIONS: Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

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
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`server is starting on http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION: Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
