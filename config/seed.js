const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const db = require('../DB/db'); // Ajusta la ruta según tu estructura de archivos

const registerUser = async () => {
    const nombre = 'Admin';
    const apellido = 'Test';
    const usuario = 'admin_test';
    const contraseña = 'mi_contraseña_segura'; // Esta es la contraseña original
    const email = 'ejemplo@gmail.com';
    const cargo = 'Administrador';
    const rol = 'admin'; // o 'empleado' según lo que necesites

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const fechaCreacion = new Date(); // Fecha actual

    console.log('Insertando usuario:', { nombre, apellido, usuario, email, cargo, rol, fecha_creacion: fechaCreacion });

    try {
        const insertQuery = `
            INSERT INTO usuarios (nombre, apellido, usuario, contraseña, email, cargo, rol, fecha_creacion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(insertQuery, [nombre, apellido, usuario, hashedPassword, email, cargo, rol, fechaCreacion]);
        console.log('Usuario registrado exitosamente.');
    } catch (err) {
        console.error('Error al registrar el usuario:', err.message);
    }
};

// Llama a la función para registrar al usuario
registerUser();
