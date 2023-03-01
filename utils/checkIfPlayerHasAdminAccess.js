const getAdminAccessMembers = require("./getAdminAccessMembers");

/**
 * @param {string} userTag with `#`
 * @returns {Promise<boolean>}
 */
module.exports = async userTag => (await getAdminAccessMembers())
  .some(({ tag }) => tag == userTag);
