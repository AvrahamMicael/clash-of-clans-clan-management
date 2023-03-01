const { CACHE_PRESET_KEYS } = require("../cache");
const { minAdminAccess } = require("../config");
const COCApi = require("../services/COCApi");
const getFromCacheElseApi = require("./getFromCacheElseApi");
const getRoleAndUpperRoles = require("./getRoleAndUpperRoles");

const adminAccessRoles = getRoleAndUpperRoles(minAdminAccess);

/**
 * @returns {Promise<Role[]>}
 */
module.exports = () => getFromCacheElseApi(CACHE_PRESET_KEYS.ADMIN_ACCESS_MEMBERS, async () =>
    (await getFromCacheElseApi(CACHE_PRESET_KEYS.CLAN_MEMBERS, COCApi.getClanMembers))
      .filter(({ role }) => adminAccessRoles.includes(role))
  );
