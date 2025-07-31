const { createServer } = require('http');
const app = require('../src/app'); // yeh tumhara Express app hai

module.exports = (req, res) => {
  const server = createServer(app);
  return server.emit('request', req, res);
};
