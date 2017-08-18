const fnArgs = require('parse-fn-args')

module.exports = (() => {
  const dependencies = {}
  const factories = {}

  const factory = (name, factory) => {
    factories[name] = factory
  }

  const register = (name, dep) => {
    dependencies[name] = dep
  }

  const get = (name) => {
    if (!dependencies[name]) {
      const factory = factories[name]
      dependencies[name] = factory && inject(factory)
      if (!dependencies[name]) {
        throw new Error('Cannot find module: ' + name)
      }
    }
    return dependencies[name]
  }

  const inject = (factory) => {
    const args = fnArgs(factory).map(dependency => get(dependency))
    return factory.apply(null, args)
  }

  return {
    factory: factory,
    register: register,
    get: get
  }
})()
