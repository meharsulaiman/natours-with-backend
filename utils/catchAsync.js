/* eslint-disable arrow-body-style */
module.exports = (fn) => {
  // return (req, res, next) => fn(req, res, next).catch((err) => next(err));
  return (req, res, next) => fn(req, res, next).catch(next); // both are same
};
