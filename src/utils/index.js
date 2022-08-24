const { promisify } = require('util');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

exports.fsStat = promisify(fs.stat);

exports.fsReadDir = promisify(fs.readdir);

exports.generateHtml = (data) => {
  // 模板路径
  const templatePath = path.join(__dirname, '../../template/index.html');
  // 获取模板资源
  const source = fs.readFileSync(templatePath).toString();
  // handlerbar转为模板语法
  const template = Handlebars.compile(source);

  return template(data);
};
