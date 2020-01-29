const {flags} = require('@oclif/command')
const ProjectsCommand = require('../utils/projects-command')
const {cli} = require('cli-ux')

class RunCommand extends ProjectsCommand {
  async runOnGroup(group, script) {
    const groups = await this.getGroups()
    const foundGroup = groups.find(g => g.name === group)

    if (!foundGroup) {
      return this.error('group not found', {
        code: 404,
      })
    }

    cli.action.start(`starting group ${group}`)
    await this.runOnProjects(foundGroup.projects, script)
    cli.action.stop('done')
  }

  async run() {
    const {group, script} = this.getFlags()

    if (!script) {
      return this.error('missing required argument [script]', {
        code: 400,
      })
    }

    if (group) {
      return this.runOnGroup(group, script)
    }

    const projects = await this.getProjects()

    if (projects.length === 0) {
      return this.error('none project found', {
        code: 404,
      })
    }

    cli.action.start(`running script ${script} on projects`)
    await this.runOnProjects(projects, script)
    cli.action.stop('done')
  }

  runOnProjects(projects, script) {
    return Promise.all(
      projects.map(project => project.run(script)),
    )
  }
}

RunCommand.description = `Run a custom script on all the projects defined on the config file
...
If a group is passed, only the group projects will get the script ran
`

RunCommand.flags = {
  ...ProjectsCommand.flags,
  group: flags.string({char: 'g', description: 'run script only on selected group'}),
  script: flags.string({char: 's', description: 'script that will be ran on the projects'}),
}

module.exports = RunCommand
