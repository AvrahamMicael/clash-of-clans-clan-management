const router = require('express').Router();
const { CACHE_PRESET_KEYS, cache } = require('../cache');
const { clanTagSharp } = require('../config');
const authOnly = require('../middlewares/authOnly');
const handleBody = require('../middlewares/handleBody');
const MemberExtraData = require('../models/MemberExtraData');
const COCApi = require('../services/COCApi');
const getFromCacheElseApi = require('../utils/getFromCacheElseApi');
const putRaidDataToMember = require('../utils/putRaidDataToMember');
const putExtraDataToMember = require('../utils/putExtraDataToMember');

router.get('/:tag', async ({ params }, res) => {
  const [ member, lastRaidMembers, extraData ] = await Promise.all([
    getFromCacheElseApi(params.tag, () => COCApi.getMember(params.tag)),
    getFromCacheElseApi(CACHE_PRESET_KEYS.LAST_RAID_MEMBERS, COCApi.getLastRaidMembers),
    MemberExtraData.getAllFromCacheElseGetOnlyOneMember(`#${params.tag}`),
  ]);

  if(member.clan?.tag != clanTagSharp)
    throw new Error("Player isn't from this clan!");

  putRaidDataToMember(member, lastRaidMembers);
  putExtraDataToMember(member, extraData);
  res.render('member', { member });
});

router.patch('/:tag', handleBody('name', 'newValue'), authOnly, async ({ body: { name, newValue }, params: { tag } }, res) => {
  await MemberExtraData.updateOneExtra(`#${tag}`, name, newValue);
  cache.delete(CACHE_PRESET_KEYS.MEMBERS_EXTRA_DATA);
  res.json({ data: { newValue } });
});

module.exports = router;
