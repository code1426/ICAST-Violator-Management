const bsql = require('better-sqlite3');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const PORT = 7777;

server.use(cors());
server.use(helmet());
server.use(express.json());

// APIs
// Violations
server.get('violations', (req, res) => {
  // get all the violations in the db
});

server.post('violations', (req, res) => {
  // get all the violators in the db
});

server.put('violations/:id', (req, res) => {
  // get all the violators in the db
});

server.delete('violations/:id', (req, res) => {
  // get all the violators in the db
});


// Caught Violators
server.get('caughtViolators', (req, res) => {
  // get all the violators in the db
});

server.get('caughtViolators/:id', (req, res) => {
  // get all the violator in the db by id
});

server.listen(PORT, () =>
  console.log(
    `The server for ICAST VIOLATOR MANAGEMENT APP has started at localhost:${PORT}`
  )
);
