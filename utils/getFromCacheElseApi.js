const { cache } = require("../cache");

module.exports = async (key, apiFunc) => {
  let data = cache.get(key);
  if(!data)
  {
    data = await apiFunc();
    cache.set(key, data);
  }
  return data;
};
