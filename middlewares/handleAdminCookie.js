module.exports = ({ signedCookies }, res, next) => {
  res.locals.admin = signedCookies.admin;
  next();
};
