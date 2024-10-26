const db = require('better-sqlite3');
const express = require('express');

const server = express();

const PORT = 7777;

server.listen(PORT, () =>
  console.log('The server for ICAST VIOLATOR MANAGEMENT APP has started.')
);
