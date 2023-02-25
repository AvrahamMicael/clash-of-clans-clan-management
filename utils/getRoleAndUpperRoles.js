module.exports = role => {
  const roles = ['leader'];
  switch(role)
  {
    case 'elder':
    case 'admin':
      roles.push('admin'); 
    case 'coLeader':
      roles.push('coLeader');
      break;
    default:
      throw new Error('Invalid role');
  }
  return roles;
};
