module.exports = class Group {
  constructor({name, projects}) {
    this.name = name
    this.projectsDefinition = projects
    this.projects = []

    this.setProjectsFrom = this.setProjectsFrom.bind(this)
  }

  static fromConfig(config = {}, index = 0) {
    if (typeof config === 'string') {
      return new Group({
        name: config,
        projects: [],
      })
    }

    const {name, projects = []} = config

    if (!name || (!Array.isArray(projects) && typeof projects !== 'string')) {
      throw new Error(`invalid group config at index ${index}`)
    }

    return new Group({
      name,
      projects,
    })
  }

  setProjectsFrom(projects) {
    if (typeof this.projectsDefinition === 'string') {
      this.projects = Object.values(projects)
    } else {
      this.projects = this.projectsDefinition.map(project => projects[project] || null).filter(Boolean)
    }

    return this
  }

  toJSON() {
    return {
      name: this.name,
      projects: this.projects,
    }
  }
}
