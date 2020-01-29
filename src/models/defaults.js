module.exports = class Defaults {
  constructor({
    start,
    stop,
    group,
  }) {
    this.start = start
    this.stop = stop
    this.group = group || null
  }

  static fromConfig(config) {
    return new Defaults({
      start: config.start || 'make start',
      stop: config.stop || 'make stop',
      group: config.group,
    })
  }
}
