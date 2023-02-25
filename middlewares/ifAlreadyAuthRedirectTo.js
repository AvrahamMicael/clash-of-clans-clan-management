const handleAdminCookie = require("./handleAdminCookie");

module.exports = redirectToRoute => (req, res, next) => handleAdminCookie(req, res, () => {
    if(res.locals.admin)
      return res.redirect(redirectToRoute);
    next();
  });
