const checkIfPlayerHasAdminAccess = require("../utils/checkIfPlayerHasAdminAccess");
const handleAdminCookie = require("./handleAdminCookie");

module.exports = (req, res, next) => handleAdminCookie(req, res, async () => {
  if(!res.locals.admin || !(await checkIfPlayerHasAdminAccess(res.locals.admin)))
    throw new Error('Invalid credentials.');
  next();
});
