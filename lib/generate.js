const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const utils = require('../utils');
const cwd = process.cwd();
const exists = require('fs').existsSync;
let config;

utils.getConfig(function (conf) {
  config = conf;
})

function setTargetPath(callback, defaultTarget) {
  const questions = [{
    type: 'input',
    name: 'target',
    message: 'which path do you want to create template to ? (default is current directory '+defaultTarget+'): ',
  }];

  inquirer.prompt(questions).then(function (answers) {
    if (callback) {
      callback(path.join(cwd, config.dest,answers.target || defaultTarget));
    }
  });
}

function getPath(template) {
  return path.join(cwd,template)
}

function generate(key) {
  var tplConf = config.generateTpls[key];
  var tplPath = getPath(tplConf.tpl);
  setTargetPath(function (targetPath) {
    if (utils.isDir(tplPath)) {   //复制文件夹到指定目录
      console.log('gDir')
    }
    if (utils.isFile(tplPath)) {  //复制文件到指定目录
      const q_name = [{
        type: 'input',
        name: 'name',
        message: 'file name:',
      }];
      inquirer.prompt(q_name).then(function (s_answers) {
        const newFileName = s_answers.name;
        var prefix = '';
        if(!newFileName){
          console.log(chalk.red('this step need input filename'));
          return;
        }
        const hasPrefix = newFileName.split('.').length==2;
        if (!hasPrefix) {
          prefix = tplPath.match(/(\.[^\.]*)$/)[1];
        }
        try {
          fs.copySync(tplPath, path.join(targetPath, newFileName + prefix), { overwrite: true });
          console.log(chalk.green(`generated success：${path.join(targetPath, newFileName + prefix)}`));
        } catch (e) {
        }
      })
    }
  }, tplConf.defaultDest || './')
}

module.exports = function (args) {
  const name = args[3];
  //当用户输入时带模板名称
  if (name) {
    generate(name);
    return
  }
  //询问用户选择哪一个模板
  const questions = [{
    type: 'checkbox',
    name: 'name',
    message: 'you can choose one of your templates to generate',
    choices: Object.keys(config.generateTpls)
  }];
  inquirer.prompt(questions).then(function (answers) {
    for (var i = 0; i < answers.name.length; i++) {
      var key = answers.name[i];
      generate(key);
    }
  })
};