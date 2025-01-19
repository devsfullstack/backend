const mysql = require('mysql2/promise');
const config = require('../config/config')


// Crear una conexión a la base de datos
const pool = mysql.createPool({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database,
          });

          console.log('Base de datos conectada: '+config.mysql.database);
        
module.exports = pool;
