const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
const Projects = require('../models/projects')
const Groups = require('../models/groups')
const Defaults = require('../models/defaults')

const readFile = promisify(fs.readFile)

module.exports = async function parseConfig(pwd, filename) {
  const fullPath = path.resolve(pwd, filename)
  const rawData = await readFile(fullPath, {
    flag: 'r',
    encoding: 'utf-8',
  })

  const json = JSON.parse(String(rawData))

  const {projects = [], defaults = {}, groups = []} = json

  const defaultsCollection = Defaults.fromConfig(defaults)
  const projectsCollection = Projects.fromConfig({
    projects,
    pwd,
    defaults: defaultsCollection,
  })

  return {
    projects: projectsCollection,
    defaults: defaultsCollection,
    groups: Groups.fromConfig({
      groups,
      projects: projectsCollection,
    }),
  }
}
