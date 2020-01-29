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
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cli365
$ cli365 COMMAND
running command...
$ cli365 (-v|--version|version)
cli365/1.0.0 linux-x64 node-v13.3.0
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

_See code: [src/commands/list.js](https://github.com/BRKsReginaldo/cli365/blob/v1.0.0/src/commands/list.js)_

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

_See code: [src/commands/list/groups.js](https://github.com/BRKsReginaldo/cli365/blob/v1.0.0/src/commands/list/groups.js)_

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

_See code: [src/commands/start.js](https://github.com/BRKsReginaldo/cli365/blob/v1.0.0/src/commands/start.js)_

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

_See code: [src/commands/stop.js](https://github.com/BRKsReginaldo/cli365/blob/v1.0.0/src/commands/stop.js)_
<!-- commandsstop -->
