const { createGzip, createDeflate } = require('zlib');

module.exports = (req, res, resource) => {
  const encoding = req.headers['accept-encoding'];
  // 没有匹配到对应的encoding方式 不压缩
  if (!encoding || !encoding.match(/\b(gzip|delate)\b/)) {
    return resource;
  }

  // 匹配搭配gzip 优先使用gzip
  if (encoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip');
    return resource.pipe(createGzip());
  }

  res.setHeader('Content-Encoding', 'deflate');
  return resource.pipe(createDeflate());
};
