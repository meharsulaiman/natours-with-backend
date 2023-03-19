const express = require('express');
const morgan = require('morgan');
const rateLimmit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

// middleware
// * Set security HTTP headers
app.use(helmet());

// * Limit requests from same API 60 per hour
const limiter = rateLimmit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this IP, pleas try again in an hour!',
});
app.use('/api', limiter);

// * Print Logs in developement
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// * Body Parser, reading data from request's body
app.use(express.json({ limit: '10kb' }));

// * Serving static file {Public folder}
app.use(express.static('public'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
