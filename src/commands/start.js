const {flags} = require('@oclif/command')
const ProjectsCommand = require('../utils/projects-command')
const {cli} = require('cli-ux')

class StartCommand extends ProjectsCommand {
  async startGroup(group) {
    const groups = await this.getGroups()
    const foundGroup = groups.find(g => g.name === group)

    if (!foundGroup) {
      return this.error('group not found', {
        code: 404,
      })
    }

    cli.action.start(`starting group ${group}`)
    await this.start(foundGroup.projects)
    cli.action.stop('done')
  }

  async run() {
    const {group} = this.getFlags()

    if (group) {
      return this.startGroup(group)
    }

    const projects = await this.getProjects()

    if (projects.length === 0) {
      return this.error('none project found', {
        code: 404,
      })
    }

    cli.action.start('starting projects')
    await this.start(projects)
    cli.action.stop('done')
  }

  start(projects) {
    return Promise.all(
      projects.map(project => project.exec('start')),
    )
  }
}

StartCommand.description = `Start all the projects defined on the config file
...
If a group is passed, only the group projects will be started
`

StartCommand.flags = {
  ...ProjectsCommand.flags,
  group: flags.string({char: 'g', description: 'start only a specific group'}),
}

module.exports = StartCommand
