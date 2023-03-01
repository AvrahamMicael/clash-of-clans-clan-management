const { COOKIES_SECURE } = require("../config");

const maxAge = 1000 * 60 * 60;

/**
 * @param {import("express").Response} res 
 * @param {string} key 
 * @param {*} value 
 */
module.exports = (res, key, value) => {
  res.cookie(key, value, {
    signed: true,
    secure: COOKIES_SECURE,
    httpOnly: true,
    sameSite: true,
    maxAge,
  });
};
