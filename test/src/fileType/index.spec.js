const { describe, it, expect } = require('../../base');
const fileType = require('../../../src/fileType');

const types = {
  png: 'img',
  jpg: 'img',
  jpeg: 'img',
  gif: 'img',
  ico: 'img',
  js: 'javascript',
  css: 'css',
  json: 'json',
  md: 'markdown',
  ttf: 'font',
  woff: 'font',
  woff2: 'font',
  html: 'html',
  file: 'file',
  directory: 'directory',
};

describe('FileType', () => {
  Object.keys(types).forEach((type) => {
    it(`should be ${type}`, () => {
      expect(fileType[type]).to.equal(types[type]);
    });
  });
});
