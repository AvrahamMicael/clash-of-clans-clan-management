const getRoleAndUpperRoles = require("./getRoleAndUpperRoles");

/**
 * @param {PromotionRequirement[]} positionsReq 
 * @returns {(member: MemberWithAllData) => boolean}
 */
module.exports = positionsReq => member =>  {
  let canBePromoted = false;
  for(const { r, a, w, wl, d, ra, p } of positionsReq)
  {
    canBePromoted = a
      && !getRoleAndUpperRoles(r).includes(member.role)
      && member.wars >= w
      && member.war_leagues >= wl
      && member.donations >= d
      && member.games_points >= p
      && member.lastRaid.attacks >= ra;
    if(!canBePromoted) continue;
    member.roleToPromote = r;
    break;
  }
  return canBePromoted;
};
