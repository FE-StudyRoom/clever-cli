var path = require('path');
var fs = require('fs');
var path = require('path');

function exists(path){
  return fs.existsSync(path) || fs.existsSync(path);
}

module.exports = {
  getConfig: function (callback) {
    var configPath = path.join(process.cwd(), '.cleverrc.js');
    var config = {};
    if (fs.existsSync(configPath)) {
      try {
        config = eval(fs.readFileSync(configPath, "utf-8"));
        callback && callback(config);
      } catch (e) {
        console.log("读取.cleverrc.js文件失败");
      }
    } else {
      console.log(".cleverrc.js文件不存在，请检查后再试");
    }
  },
  isFile: function (path) {
    return exists(path) && fs.statSync(path).isFile();
  },
  isDir: function (path) {
    return exists(path) && fs.statSync(path).isDirectory();
  }
}