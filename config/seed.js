/*const bcrypt = require('bcrypt');
const {pool} = require('../db/db.js'); // Ajusta la ruta según tu estructura de archivos
const db = require('../db/db.js')  

const tabla = 'usuarios'; 

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


    const sql = (`INSERT INTO ${tabla} (nombre, apellido, usuario, contraseña, email, cargo, rol) VALUES ("${nombre}", "${apellido}", "${usuario}", "${hashedPassword}", "${email}", "${cargo}", "${rol}")`)
    db.query(sql, (err, results) => {
        if (err) { return res.status(500).send(`Error creando registro en tabla: ${tabla}`) }
            
        res.json(results)});

    }
// Llama a la función para registrar al usuario
registerUser();
*/

const bcrypt = require('bcrypt');
const { pool } = require('../db/db.js');

const tabla = 'usuarios';

const registerUser = async () => {
    const nombre = 'Admin';
    const apellido = 'Test';
    const usuario = 'admin_test';
    const contraseña = 'mi_contraseña_segura'; // Esta es la contraseña original
    const email = 'ejemplo@gmail.com';
    const cargo = 'Administrador';
    const rol = 'admin'; // o 'empleado' según lo que necesites

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const fechaCreacion = new Date();

    try {
        const [results] = await pool.query(
            `INSERT INTO ${tabla} (nombre, apellido, usuario, contraseña, email, cargo, rol, fecha_creacion) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, usuario, hashedPassword, email, cargo, rol, fechaCreacion]
        );
        console.log('Usuario registrado con éxito:', results);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Manejar el error de forma más específica, por ejemplo, enviando un correo electrónico al administrador
    }
};

registerUser();
