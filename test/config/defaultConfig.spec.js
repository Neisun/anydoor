const { describe, it, expect } = require('../base');
const defaultConfig = require('../../config/defaultConfig');

describe('defaultConfig', () => {
  describe('#property host', () => {
    it('defaultConfig.host should be 127.0.0.1', () => {
      expect(defaultConfig.host).to.equal('127.0.0.1');
    });
  });

  describe('#property port', () => {
    it('defaultConfig.port should be 8989', () => {
      expect(defaultConfig.port).to.equal(8989);
    });
  });

  describe('#property root', () => {
    it('defaultConfig.root should be process.cwd()', () => {
      expect(defaultConfig.root).to.equal(process.cwd());
    });
  });
});
