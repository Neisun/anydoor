const { program } = require('commander');
const config = require('../config/defaultConfig');
const Server = require('./app');

program
  .option('-p, --port <port>', '服务启动端口', config.port)
  .option('-h, --host <host>', '主机', config.host);

program.parse(process.argv);

// 获取命令行参数
const option = program.opts();

const app = new Server(option);

app.start();
