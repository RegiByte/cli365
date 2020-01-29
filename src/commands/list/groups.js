const ProjectsCommand = require('../../utils/projects-command')
const {cli} = require('cli-ux')

class GroupsCommand extends ProjectsCommand {
  async run() {
    const groups = await this.getGroups()

    if (groups.length === 0) {
      return this.error('none group found', {
        code: 404,
      })
    }

    this.log('* Groups =============================================================')
    cli.table(groups, {
      name: {
        minWidth: 15,
      },
      projects: {
        get: row => row.projects.map(project => {
          return project.name
        }).join(', '),
      },
    })
    this.log('* Groups =============================================================')
  }
}

GroupsCommand.description = `List all groups and its projects
...
Extra documentation goes here
`

GroupsCommand.flags = {
  ...ProjectsCommand.flags,
}

module.exports = GroupsCommand
