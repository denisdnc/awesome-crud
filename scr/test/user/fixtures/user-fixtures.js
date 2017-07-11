const UserFixtures = (function() {

  const valid = () => {
    return {
      name: 'name',
      email: 'email@email.com',
      password: '123456'
    };
  }

  return {
    valid: valid
  }

})();

module.exports = UserFixtures;
