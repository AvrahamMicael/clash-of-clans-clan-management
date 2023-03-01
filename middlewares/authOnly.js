const StatusCodeError = require("../custom-errors/StatusCodeError");
const checkIfPlayerHasAdminAccess = require("../utils/checkIfPlayerHasAdminAccess");
const handleAdminCookie = require("./handleAdminCookie");

/**
 * @throws {StatusCodeError}
 */
module.exports = (req, res, next) => handleAdminCookie(req, res, async () => {
  if(!res.locals.admin || !(await checkIfPlayerHasAdminAccess(res.locals.admin)))
    throw new StatusCodeError('Invalid credentials.', 401);
  next();
});
