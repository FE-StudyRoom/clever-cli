# Cli for Manage project

## A simple CLI for Create/General Project

<!-- badges section. -->


## Feature（特征）

## Usage（用法）

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=6.x, 8.x preferred), npm
version 3+ and [Git](https://git-scm.com/).

```bash
$ npm install fe-clever-cli -g
```
### config 
.cleverrc.js
```
module.exports = {
  projectName: 'test',//项目名称
  dest: 'src',//目标文件夹
  repository: {
    protocal: '',//协议
    branch: '',//分支
    origin: '',//代码源
    host: '',//
  },
  generateTpls: {    //配置工具模板  可以是文件夹/文件
    component: {
      tpl: '',   //模板路径
      defaultDest: '', //默认输出地址
    },
    model: {
      tpl: './templates/demo.js',
      defaultDest: '/project/model',
    },
    routes: {},
    view: {
      tpl: './templates/demo',
      defaultDest: '/project'
    }
  }
};
```

### New a project form your config

```bash
$ clever new // will download your .cleverrc.js origin/branch template
$ clever new --no-auto-install // not auto install dependencies
```

## Generate

```bash
$ cd your application
$ clever g
```

## CHANGELOG

### 0.0.1

* create the project