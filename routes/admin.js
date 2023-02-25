const handleBody = require('../middlewares/handleBody');
const ifAlreadyAuthRedirectTo = require('../middlewares/ifAlreadyAuthRedirectTo');
const COCApi = require('../services/COCApi');
const checkIfPlayerHasAdminAccess = require('../utils/checkIfPlayerHasAdminAccess');
const setSignedCookie = require('../utils/setSignedCookie');

const router = require('express').Router();

router.get('/', ifAlreadyAuthRedirectTo('/'), (req, res) => {
  res.render('admin');
});

router.post('/', ifAlreadyAuthRedirectTo('/'), handleBody('playerTag', 'playerToken'), async ({ body: { playerTag, playerToken } }, res) => {
  if(!(await checkIfPlayerHasAdminAccess(playerTag)))
    throw new Error(`You're not authorized to enter admin area!`);

  const isValid = await COCApi.postCheckToken(playerTag.replace('#', ''), playerToken);
  if(!isValid)
    return res.redirect('/admin');

  setSignedCookie(res, 'admin', playerTag);
  res.redirect('/');
});

module.exports = router;