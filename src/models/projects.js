const path = require('path')
const Project = require('./project')

module.exports = class Projects {
  static fromConfig({projects, defaults, pwd}) {
    return projects.map(Project.withDefaults(defaults)).filter(Boolean).map(project => {
      return project.setPath(path.resolve(pwd, project.path))
    })
  }
}
