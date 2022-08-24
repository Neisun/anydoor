const path = require('path');
const mimeType = require('../mimeType');

module.exports = (filePath) => {
  const extname = path.extname(filePath);
  const fileType = extname.split('.')[1];
  return mimeType[fileType] || 'text/plain';
};
