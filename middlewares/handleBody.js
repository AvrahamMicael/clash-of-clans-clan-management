module.exports = (...items) => ({ body }, res, next) => {
  const notProvidedItems = items.filter(item => [ undefined, null, '' ].includes(body[item]));
  if(notProvidedItems.length)
    throw new Error(`${ notProvidedItems.join(', ') } must be provided`);
  next();
};
