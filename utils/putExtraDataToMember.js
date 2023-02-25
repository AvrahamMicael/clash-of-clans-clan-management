module.exports = (member, extraData) => {
  const setProperty = propName => {
    member[propName] = extraData?.[propName] ?? 0;
  };
  setProperty('wars');
  setProperty('war_leagues');
  setProperty('games_points');
  return member;
};
