const addRoutePathToRes = require('../middlewares/addRoutePathToRes');
const handleAdminCookie = require('../middlewares/handleAdminCookie');
const handleBody = require('../middlewares/handleBody');
const authOnly = require('../middlewares/authOnly');
const PromotionRequirement = require('../models/PromotionRequirement');
const { cache, CACHE_PRESET_KEYS } = require('../cache');
const router = require('express').Router();

router.get('/', addRoutePathToRes, handleAdminCookie, async (req, res) => {
  const requirements = await PromotionRequirement.getAllOrCreateDefaults();
  res.render('promotions', { requirements });
});

router.get('/can-be-promoted', addRoutePathToRes, async (req, res) => {
  const members = await PromotionRequirement.getMembersWhichCanBePromoted();
  res.render('can-be-promoted', { members });
});

router.patch('/:role', handleBody('property', 'newValue'), authOnly, async ({ body: { property, newValue }, params: { role } }, res) => {
  await PromotionRequirement.updateOneProperty(role, property, newValue);
  cache.delete(CACHE_PRESET_KEYS.PROMOTIONS_REQUIREMENTS);
  res.json({ ok: true });
});

module.exports = router;
