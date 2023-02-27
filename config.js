require('dotenv').config();

const inProd = process.env.NODE_ENV != 'development';

module.exports = {
  clanName: process.env.CLAN_NAME || '',
  clanTag: process.env.CLAN_TAG || '',
  clanTagSharp: '#' + process.env.CLAN_TAG,
  clanTagEncoded: '%23' + process.env.CLAN_TAG,
  minAdminAccess: process.env.MIN_ADMIN_ACCESS || 'elder',
  APP_LOCALE: process.env.LOCALE,
  COC_API_KEY: process.env.COC_API_KEY || '',
  COOKIES_SECRET: process.env.COOKIES_SECRET || '',
  COOKIES_SECURE: inProd,
  MONGO_URI: process.env[inProd ? 'MONGO_URI' : 'MONGO_URI_TEST'],
};
