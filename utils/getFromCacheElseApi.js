const { cache } = require("../cache");

/**
 * @template T
 * @param {string} key 
 * @param {() => Promise<T>} apiFunc callback to get the value if isn't found on cache
 * @returns {Promise<T>}
 */
module.exports = async (key, apiFunc) => {
  let data = cache.get(key);
  if(!data)
  {
    data = await apiFunc();
    cache.set(key, data);
  }
  return data;
};
