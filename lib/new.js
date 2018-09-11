const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const shell = require('shelljs');
const inquirer = require('inquirer');
const ora = require('ora');
const download = require('download-git-repo');
const which = require('which');
const exists = require('fs').existsSync;
const utils = require('../utils');
var config;

utils.getConfig(function (conf) {
  config = conf;
})

const npms = ['tnpm', 'cnpm', 'npm'];

const cwd = process.cwd();
const origin = config.repository.origin;
const branch = config.repository.branch;

function findNpm() {
  for (var i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i]);
      console.log('use npm: ' + npms[i]);
      return npms[i];
    } catch (e) {

    }
  }
  throw new Error('please install npm');
}

module.exports = function (args) {

  const autoInstall = !(args[3] === '--no-auto-install');

    const questions = [{
      type: 'input',
      name: 'name',
      message: 'input project name:',
    }, {
      type: 'input',
      name: 'path',
      message: 'which directory do you want to init to ? (default is current directory ./):',
    }];

    const newType = 'standard';

    inquirer.prompt(questions).then(function (answers) {

      const projectName = answers.name || 'ant-design-pro-template';
      const targetPath = path.join(cwd, answers.path || './');

      if (exists(path.join(targetPath, projectName))) {
        console.log(chalk.red('exit: directory is already exists'));
        return;
      }

      const spinner = ora('downloading template...');
      spinner.start();

      download(`${origin}${branch}`, path.join(targetPath, projectName), { clone: false }, function (err) {
        spinner.stop();
        if (err) {
          console.log(chalk.red(`Failed to download repo https://github.com/${origin}${branch}`, err));
        } else {
          console.log(chalk.green(`Success to download repo https://github.com/${origin}${branch} to ${targetPath}`));

          if (!autoInstall) {
            return;
          }

          const spinnerInstall = ora('Auto installing...');
          spinnerInstall.start();

          const npm = findNpm();

          shell.exec(`cd ${path.join(targetPath, projectName)} && ${npm} install`, function () {
            console.log(chalk.green(npm + ' install end'));
            spinnerInstall.stop();
          });
        }
      })
    });
};