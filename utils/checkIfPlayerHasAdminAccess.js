const getAdminAccessMembers = require("./getAdminAccessMembers");

module.exports = async userTag => (await getAdminAccessMembers())
  .some(({ tag }) => tag == userTag);
