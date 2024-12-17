const mysql = require('mysql2'); // Importar la versión con promesas
const config = require('../config/config')

// Crear una conexión a la base de datos usando un pool para manejar múltiples conexiones
const db = async()=>{
try {
    await mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
        });
        console.log('Conexión a la base de datos establecida: '+config.mysql.database);
} catch (error) {
    throw new Error('Error al crear la conexión a la base de datos');
}
}
module.exports = db; // Exportar el pool de conexiones
