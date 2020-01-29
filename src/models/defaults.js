module.exports = class Defaults {
  constructor({
    start,
    stop,
    group,
    scripts,
  }) {
    this.start = start
    this.stop = stop
    this.group = group
    this.scripts = scripts
  }

  static fromConfig(config) {
    return new Defaults({
      start: config.start || 'make start',
      stop: config.stop || 'make stop',
      group: config.group || null,
      scripts: config.scripts || {},
    })
  }
}
