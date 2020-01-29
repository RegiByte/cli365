const Group = require('./group')
const {keyBy} = require('lodash')

module.exports = class Groups {
  static fromConfig({
    groups,
    projects,
  }) {
    const projectsByName = keyBy(projects, 'name')

    return groups.map(Group.fromConfig).filter(Boolean).map(group => {
      return group.setProjectsFrom(projectsByName)
    })
  }
}
