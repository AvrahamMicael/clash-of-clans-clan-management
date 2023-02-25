module.exports = (member, lastRaidMembers) => {
  const { attacks, attackLimit, bonusAttackLimit } = lastRaidMembers.find(({ tag }) => tag == member.tag)
    ?? { attacks: 0, attackLimit: 0, bonusAttackLimit: 0 };
  member.lastRaid = { attacks, attackLimit: attackLimit + bonusAttackLimit };
  return member;
};
