const server = require('./config/server')
const pool = require('./DB/db')

pool();
server();