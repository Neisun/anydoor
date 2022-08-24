const http = require('http');
const chalk = require('chalk');
const os = require('os');
const { exec } = require('child_process');
const defaultConfig = require('../config/defaultConfig');
const route = require('./route/index');

class Server {
  constructor(config) {
    this.config = { ...defaultConfig, ...config };
    this.app = http.createServer((req, res) => {
      route(req, res);
    });
  }

  start() {
    this.app.listen(this.config.port, this.config.host, () => {
      const url = `http://${this.config.host}:${this.config.port}`;
      if (os.platform() === 'darwin') {
        exec(`open ${url}`);
      }

      if (os.platform() === 'win32') {
        exec(`start ${url}`);
      }
      console.log(`server is running on ${chalk.bgBlueBright.bold(url)}`);
    });
  }
}

module.exports = Server;
