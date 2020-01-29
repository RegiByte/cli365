const {cli} = require('cli-ux')
const ProjectsCommand = require('../utils/projects-command')

class ListCommand extends ProjectsCommand {
  async run() {
    const projects = await this.getProjects()

    if (projects.length === 0) {
      return this.error('none project found', {
        code: 404,
      })
    }

    this.log(projects)

    this.log('* Projects =============================================================')
    cli.table(projects, {
      name: {
        minWidth: 20,
      },
      path: {},
    })
    this.log('* Projects =============================================================')
  }
}

ListCommand.description = `List all projects found based on the cli365.json
...
Extra documentation goes here
`

ListCommand.flags = {
  ...ProjectsCommand.flags,
}

module.exports = ListCommand
