module.exports = (buildMessage) => {
    const execute = () => {
      return buildMessage.execute('Hello ', "World!")
    }
    return {
      execute: execute
    }
}
