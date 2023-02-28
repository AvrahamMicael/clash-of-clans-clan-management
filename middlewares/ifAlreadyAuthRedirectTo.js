const handleAdminCookie = require("./handleAdminCookie");

module.exports = redirectToRoute => (req, res, next) => handleAdminCookie(req, res, () => {
    if(res.locals.admin)
      return res.redirect(302, redirectToRoute);
    next();
  });
