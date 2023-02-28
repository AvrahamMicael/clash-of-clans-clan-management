const StatusCodeError = require("../custom-errors/StatusCodeError");

module.exports = (...items) => ({ body }, res, next) => {
  const notProvidedItems = items.filter(item => [ undefined, null, '' ].includes(body[item]));
  if(notProvidedItems.length)
    throw new StatusCodeError(`${ notProvidedItems.join(', ') } must be provided`, 400);
  next();
};
