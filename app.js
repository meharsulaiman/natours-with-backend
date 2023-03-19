const express = require('express');
const morgan = require('morgan');
const rateLimmit = require('express-rate-limit');

const app = express();

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

// middleware
const limiter = rateLimmit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this IP, pleas try again in an hour!',
});

app.use('/api', limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
