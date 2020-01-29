const path = require('path')
const {promisify} = require('util')
const exec = promisify(require('child_process').exec)

module.exports = class Project {
  constructor({
    name,
    path,
    start,
    stop,
  }) {
    this.name = name
    this.path = path
    this.start = start
    this.stop = stop

    this.setPath = this.setPath.bind(this)
  }

  static withDefaults(defaults) {
    return (...args) => Project.fromConfig(defaults, ...args)
  }

  static onlyPath({
    config: configPath,
    defaults = {},
  }) {
    const name = path.basename(configPath)

    return new Project({
      name,
      path: configPath,
      start: defaults.start,
      stop: defaults.stop,
    })
  }

  static fullConfig({
    config,
    index = 0,
    defaults = {},
  }) {
    const {name: basename, path: basepath} = config

    if (!basepath) {
      throw new Error(`Invalid project config at index ${index}`)
    }

    let name = basename || path.basename(basepath)

    return new Project({
      name,
      path: basepath,
      start: config.start || defaults.start,
      stop: config.stop || defaults.stop,
    })
  }

  static fromConfig(defaults = {}, ...args) {
    const [config, index] = args

    if (!config) {
      return null
    }

    // If we have only provided the path on the project
    if (typeof config === 'string') {
      return Project.onlyPath({
        config,
        defaults,
      })
    }

    return Project.fullConfig({
      config,
      index,
      defaults,
    })
  }

  setPath(path) {
    if (!path) throw new Error('invalid path')

    this.path = path

    return this
  }

  async exec(command) {
    if (!this[command]) {
      throw new Error(`command not defined ${command}`)
    }

    return exec(`cd ${this.path} && ${this[command]}`)
  }
}
