const axios = require('axios');
const { cache, CACHE_PRESET_KEYS } = require('../cache');
const { COC_API_KEY, clanTagEncoded } = require('../config');
const MemberExtraData = require('../models/MemberExtraData');
const getFromCacheElseApi = require('../utils/getFromCacheElseApi');
const putRaidDataToMember = require('../utils/putRaidDataToMember');

/**
 * @typedef {object} __COCApi
 * @property {(options: {}) => Promise<ClanMember[]>} getClanMembers
 * @property {(options: {}) => Promise<RaidMember[]>} getLastRaidMembers
 * @property {(playerTag: TagWithoutSharp, options: {}) => Promise<Player>} getMember 
 * @property {() => Promise<MemberWithAllData[]>} getMembersWithAllData
 * @property {(tag: TagWithoutSharp, token: string) => Promise<boolean>} postCheckToken
 * @typedef {__COCApi & import('axios').AxiosInstance} COCApi
 */

/**
 * @type {COCApi}
 */
const COCApi = axios.create({
  baseURL: 'https://api.clashofclans.com/v1/',
  headers: {
    Authorization: `Bearer ${COC_API_KEY}`,
  },
});

COCApi.getClanMembers = (options = {}) => COCApi.get(`clans/${clanTagEncoded}/members`, options)
  .then(({ data }) => {
    const members = data.items;
    cache.set(CACHE_PRESET_KEYS.CLAN_MEMBERS, members);
    return members;
  });

COCApi.getLastRaidMembers = (options = {}) => COCApi.get(`clans/${clanTagEncoded}/capitalraidseasons?limit=1`, options)
  .then(({ data }) => {
    const lastRaidMembers = data.items[0].members;
    cache.set(CACHE_PRESET_KEYS.LAST_RAID_MEMBERS, lastRaidMembers);
    return lastRaidMembers;
  });

COCApi.getMember = (playerTag, options = {}) => COCApi.get(`players/%23${playerTag}`, options)
  .then(({ data: player }) => {
    cache.set(playerTag, player)
    return player;
  });

COCApi.getMembersWithAllData = async () => {
    const [ members, lastRaidMembers, extraData ] = await Promise.all([
      getFromCacheElseApi(CACHE_PRESET_KEYS.CLAN_MEMBERS, COCApi.getClanMembers),
      getFromCacheElseApi(CACHE_PRESET_KEYS.LAST_RAID_MEMBERS, COCApi.getLastRaidMembers),
      getFromCacheElseApi(CACHE_PRESET_KEYS.MEMBERS_EXTRA_DATA, () => MemberExtraData.getAll()),
    ]);
    MemberExtraData.createExtraDataIfDoesntExistAndAdd(members, extraData);
    return members.map(member => putRaidDataToMember(member, lastRaidMembers));
  };

COCApi.postCheckToken = (tag, token) => COCApi.post(`players/%23${tag}/verifytoken`, { token })
  .then(({ data }) => data.status == 'ok');

module.exports = COCApi;
