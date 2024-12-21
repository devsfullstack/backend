/// insertData.js
const pool = require('../db/db');
const bcrypt = require('bcrypt');

const insertarUsuario = async () => {
    const nombre = 'Juan';
    const apellido = 'Pérez';
    const usuario = 'juan_perez';
    const contraseña = 'mi_contraseña_segura'; 
    const email = 'juan.perez@gmail.com';
    const cargo = 'Empleado';
    const rol = 'empleado';
    const fechaCreacion = new Date();

    // Asegúrate de esperar la resolución de la promesa de hash de contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

        const [results] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, usuario, contraseña, email, cargo, rol, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, usuario, hashedPassword, email, cargo, rol, fechaCreacion]
        );

        if (results.affectedRows > 0) {
        console.log('Datos insertados con éxito:', results);
        } else {
            console.log('Error al insertar datos');
            }
};

insertarUsuario();
