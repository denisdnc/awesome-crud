module.exports = (validateModel) => {
  const userRules = {
    name: {
      title: 'Name',
      validate: [{
        validator: 'isLength',
        arguments: [1, 255],
        message: '{TITLE} is mandatory'
      }]
    },
    email: {
      title: 'Email',
      validate: [{
        validator: 'isEmail',
        message: '{TITLE} must be valid'
      }]
    },
    password: {
      title: 'Password',
      validate: [{
        validator: 'isLength',
        arguments: [6, 255],
        message: '{TITLE} is too short'
      }]
    }
  }

  const execute = (user) => {
    return validateModel.validateAll(userRules, user)
  }

  return {
    execute: execute
  }
}
