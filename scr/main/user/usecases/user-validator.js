const userValidator = (() => {
  let validateModel

  const userRules = {
    name: {
      title: 'Name',
      validate: [{
        validator: 'isLength',
        arguments: [1, 255]
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

  const validate = (user) => {
    return validateModel.validateAll(userRules, user)
  }

  const init = (options) => {
    validateModel = options.validateModel
  }

  return {
    init: init,
    validate: validate
  }
})()

module.exports = userValidator
