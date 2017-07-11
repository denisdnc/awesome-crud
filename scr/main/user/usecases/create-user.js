const CreateUser = (() => {

  UserValidator = require('scr/main/user/usecases/user-validator');

  const execute = (user, callback) => {
    const result = UserValidator.validate(user);
    if (!result.valid) {
      callback(result.messages);
    }
    callback(null, user);
  };

  return {
    execute: execute
  };

})();

module.exports = CreateUser;
