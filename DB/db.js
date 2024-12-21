const mysql = require('mysql2');
const config = require('../config/config')


const db = mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database
        })

        db.connect(
            function(err) { 
                if (err) {
                    console.error('Error de conexión enm la base de datos:', err);
                    return;
                    }
                    console.log('Base de datos conectada: '+config.mysql.database+' id ' + db.threadId);
                    })

module.exports = db;