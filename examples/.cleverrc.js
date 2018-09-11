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