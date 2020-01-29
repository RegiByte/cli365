cli365
======

A cli used to manage the rede365 projects

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli365.svg)](https://npmjs.org/package/cli365)
[![Downloads/week](https://img.shields.io/npm/dw/cli365.svg)](https://npmjs.org/package/cli365)
[![License](https://img.shields.io/npm/l/cli365.svg)](https://github.com/BRKsReginaldo/cli365/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Config](#config)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cli365
$ cli365 COMMAND
running command...
$ cli365 (-v|--version|version)
cli365/1.1.1 linux-x64 node-v13.3.0
$ cli365 --help [COMMAND]
USAGE
  $ cli365 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cli365 help [COMMAND]`](#cli365-help-command)
* [`cli365 list`](#cli365-list)
* [`cli365 list:groups`](#cli365-listgroups)
* [`cli365 run`](#cli365-run)
* [`cli365 start`](#cli365-start)
* [`cli365 stop`](#cli365-stop)

## `cli365 help [COMMAND]`

display help for cli365

```
USAGE
  $ cli365 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `cli365 list`

List all projects found based on the cli365.json

```
USAGE
  $ cli365 list

OPTIONS
  -c, --config=config  [default: cli365.json] cli365 config file

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/list.js](https://github.com/BRKsReginaldo/cli365/blob/v1.1.1/src/commands/list.js)_

## `cli365 list:groups`

List all groups and its projects

```
USAGE
  $ cli365 list:groups

OPTIONS
  -c, --config=config  [default: cli365.json] cli365 config file

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/list/groups.js](https://github.com/BRKsReginaldo/cli365/blob/v1.1.1/src/commands/list/groups.js)_

## `cli365 run`

Run a custom script on all the projects defined on the config file

```
USAGE
  $ cli365 run

OPTIONS
  -c, --config=config  [default: cli365.json] cli365 config file
  -g, --group=group    run script only on selected group
  -s, --script=script  script that will be ran on the projects

DESCRIPTION
  ...
  If a group is passed, only the group projects will get the script ran
```

_See code: [src/commands/run.js](https://github.com/BRKsReginaldo/cli365/blob/v1.1.1/src/commands/run.js)_

## `cli365 start`

Start all the projects defined on the config file

```
USAGE
  $ cli365 start

OPTIONS
  -c, --config=config  [default: cli365.json] cli365 config file
  -g, --group=group    start only a specific group

DESCRIPTION
  ...
  If a group is passed, only the group projects will be started
```

_See code: [src/commands/start.js](https://github.com/BRKsReginaldo/cli365/blob/v1.1.1/src/commands/start.js)_

## `cli365 stop`

Stop all the projects defined on the config file

```
USAGE
  $ cli365 stop

OPTIONS
  -c, --config=config  [default: cli365.json] cli365 config file
  -g, --group=group    start only a specific group

DESCRIPTION
  ...
  If a group is passed, only the group projects will be stopped
```

_See code: [src/commands/stop.js](https://github.com/BRKsReginaldo/cli365/blob/v1.1.1/src/commands/stop.js)_
<!-- commandsstop -->

# Config

The config file is a json, it supports the following attributes:

```json
{
  "defaults": {}, 
  "projects": [],
  "groups": []
}
```

## Defaults

The defaults is an object that defines the default behavior for start/stop scripts, the default group to which projects will belong
and also the default scripts that will be inherited by all the projects

**example**
```json
{
  "defaults": {
    "group": "full-stack",
    "start": "make start",
    "stop": "make stop",
    "scripts": {
      "push": "git push",
      "pull": "git pull"
    }
  }
}
```

## Projects

Projects is an array of objects that defines how the project should be interpreted by the cli (path, name, scripts (start/stop/custom))
the only argument that is required for the projects definition is the project path which may be passed through the config object or directly as
one of the projects item

**examples**
```text
{
  "projects": [
    "auth-service", // Here the project name and path will be the same, scripts (start/stop/custom) will use the defaults
    {
       "name": "auth", // Custom name, optional, will use path basename if not defined
       "path": "./auth-service" // the path is required when you are using a config object, and the ./ is optional
    },
    {
      "path": "auth-service",
      "start": "yarn start", // custom start script, will override the defaults.start definition
      "stop": "yarn stop" // custom stop command, same as custom start
    },
    {
      "path": "auth-service",
      "scripts": {
        "pull": "git pull origin develop" // custom pull script, will override defaults.scripts.pull definition if defined
      }
    }
  ]
}
```

## Groups

Groups is an array of objects that defines the project groups to allow easy start/stop and execution of custom scripts
in pre-defined groups like frontend, backend, databases...

**example**
```
{
  "groups": [
    {
      "name": "full-stack",
      "projects": "*" // the * wildcard is used to indicate the cli that this group will have all defined projects
    },
    {
        "name": "frontend",
        "projects": ["frontend-1", "frontend-1"] // all the project names defined in the projects.* section
    }   
  ]
}
```

An important thing to be aware of is that inside `groups.*.projects` you should put the project name defined in 
`projects.*.name`, if you haven't defined a custom name for the project, the path basename will be used as project name 
so this is the one you should use here.
