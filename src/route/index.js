const path = require('path');
const fs = require('fs');
const defaultConfig = require('../../config/defaultConfig');
const { fsStat, fsReadDir, generateHtml } = require('../utils/index');
const fileType = require('../fileType/index');
const getContentType = require('../helper/mimeHandler');
const compress = require('../helper/compressHandler');

module.exports = async (req, res) => {
  try {
    // 当前路径
    const { url } = req;
    // 拼接路径获取文件路径
    const filePath = path.join(defaultConfig.root, url);
    // 接下来判断当前路径是文件还是文件夹
    const stats = await fsStat(filePath);
    if (stats.isFile()) { // 如果是文件格式
      const contentType = getContentType(filePath);
      let rs = fs.createReadStream(filePath);
      rs = compress(req, res, rs);
      res.statusCode = 200;
      res.setHeader('Content-Type', `${contentType}; charset=utf-8`);
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      let files = await fsReadDir(filePath);
      // 处理files方便渲染
      files = files.map((item) => {
        let extname = path.extname(item);
        if (!extname) {
          extname = 'directory';
        } else if (extname.split('.')[1] in fileType) {
          extname = fileType[extname.split('.')[1]];
        } else {
          extname = 'file';
        }
        return {
          name: item,
          type: extname,
        };
      });
      // 求出当前路径相对于根目录的位置
      const dir = path.relative(defaultConfig.root, filePath);
      // 组装handlebars数据
      const data = {
        title: path.basename(filePath),
        files,
        dir: dir ? `/${dir}` : '',
      };
      // handlebars渲染出html
      const html = generateHtml(data);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(html);
    }
  } catch (error) {
    res.statusCode = 500;
    console.log(error);
    res.end();
  }
};
