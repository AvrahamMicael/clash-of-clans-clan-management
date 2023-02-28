module.exports = role => {
  const roles = ['leader'];
  switch(role)
  {
    case 'member': roles.push('member');
    case 'elder':
    case 'admin': roles.push('admin'); 
    case 'coLeader': roles.push('coLeader');
    case 'leader': break;
    default:
      throw new Error('Invalid role');
  }
  return roles;
};
