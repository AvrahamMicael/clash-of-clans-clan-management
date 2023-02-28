const StatusCodeError = require('../custom-errors/StatusCodeError');
const handleBody = require('../middlewares/handleBody');
const ifAlreadyAuthRedirectTo = require('../middlewares/ifAlreadyAuthRedirectTo');
const COCApi = require('../services/COCApi');
const checkIfPlayerHasAdminAccess = require('../utils/checkIfPlayerHasAdminAccess');
const setSignedCookie = require('../utils/setSignedCookie');

const router = require('express').Router();

router.get('/', ifAlreadyAuthRedirectTo('/'), ({ query: { invalid } }, res) => {
  res.render('admin', { invalid });
});

router.post('/', ifAlreadyAuthRedirectTo('/'), handleBody('playerTag', 'playerToken'), async ({ body: { playerTag, playerToken } }, res) => {
  if(!(await checkIfPlayerHasAdminAccess(playerTag)))
    throw new StatusCodeError(`You're not authorized to enter admin area!`, 403);

  const isValid = await COCApi.postCheckToken(playerTag.replace('#', ''), playerToken);
  if(!isValid)
    return res.redirect(302, '/admin?invalid=1');

  setSignedCookie(res, 'admin', playerTag);
  res.redirect('/');
});

module.exports = router;
