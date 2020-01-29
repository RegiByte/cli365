const {Command, flags} = require('@oclif/command')
const parseConfig = require('./parseConfig')

class ProjectsCommand extends Command {
  getParsed() {
    if (!this.parsedCommand) {
      this.parsedCommand = this.parse(this.constructor)
    }

    return this.parsedCommand
  }

  getFlags() {
    return this.getParsed().flags
  }

  async getParsedConfig() {
    if (!this.parsedConfig) {
      const {config} = this.getFlags()

      if (!config) {
        throw new Error('config file not found')
      }

      this.parsedConfig = await parseConfig(process.cwd(), config || 'cli365.json')
    }

    return this.parsedConfig
  }

  async getProjects() {
    return this.getParsedConfig().then(config => config.projects)
  }

  async getGroups() {
    return this.getParsedConfig().then(config => config.groups)
  }

  async run() {
    throw new Error(`implement run command for ${this.constructor.name}`)
  }
}

ProjectsCommand.flags = {
  config: flags.string({char: 'c', description: 'cli365 config file', default: 'cli365.json'}),
}

module.exports = ProjectsCommand
