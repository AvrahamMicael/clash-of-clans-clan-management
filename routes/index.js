const router = require('express').Router();
const handleAdminCookie = require('../middlewares/handleAdminCookie');
const addRoutePathToRes = require('../middlewares/addRoutePathToRes');
const COCApi = require('./../services/COCApi');

router.get('/', addRoutePathToRes, handleAdminCookie, async (req, res) => {
  const members = await COCApi.getMembersWithAllData();
  res.render('index', { members });
});

module.exports = router;
