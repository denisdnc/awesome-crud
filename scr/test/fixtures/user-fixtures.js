const userFixtures = (() => {
  const valid = () => {
    return {
      name: 'name',
      email: 'email@email.com',
      password: '123456'
    }
  }

  const invalid = () => {
    return {
      name: '',
      email: '',
      password: ''
    }
  }

  return {
    valid: valid,
    invalid, invalid
  }
})()

module.exports = userFixtures
