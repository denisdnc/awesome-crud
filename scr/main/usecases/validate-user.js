module.exports = (validator) => {
  const validate = (errors, property, rules) => {
    const result = validator.value(property, rules)
    if (!result.approved) {
      errors.push({
        property: rules.title,
        messages: result.errors
      })
    }
  }

  const execute = (user) => {
    const errors = []

    validate(errors, user, {
      title: 'user',
      required: true
    })

    validate(errors, user.name, {
      title: 'name',
      required: true
    })

    validate(errors, user.email, {
      title: 'email',
      required: true,
      email: true
    })

    validate(errors, user.password, {
      title: 'password',
      required: true,
      range: {
        min: 6,
        max: 50
      }
    })

    return errors
  }

  return {
    execute: execute
  }
}
