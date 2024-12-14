const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../DB/db'); // Asegúrate de que esta ruta sea correcta
const { jwtSecret, jwtExpiresIn } = require('../config/jwtConfig');
require('dotenv').config(); // Cargar variables de entorno

// Función para registrar un nuevo usuario
const register = async (req, res) => {
    const { nombre, apellido, usuario, contraseña, email, cargo, rol } = req.body; // Agregar rol

    // Verificar que todos los campos estén presentes
    if (!nombre || !apellido || !usuario || !contraseña || !email || !cargo || !rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUserQuery = 'SELECT * FROM usuarios WHERE usuario = ? OR email = ?';
        const [existingUsers] = await db.query(existingUserQuery, [usuario, email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'El usuario o el email ya existe.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Consultar la base de datos para registrar el nuevo usuario
        const insertQuery = 'INSERT INTO usuarios (nombre, apellido, usuario, contraseña, email, cargo, rol, fecha_ingreso) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
        await db.query(insertQuery, [nombre, apellido, usuario, hashedPassword, email, cargo, rol]);

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (err) {
        console.error('Error al registrar el usuario:', err.message);
        return res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
};

// Función para iniciar sesión
const login = async (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const query = 'SELECT * FROM usuarios WHERE usuario = ?';
        const [results] = await db.query(query, [usuario]);

        // Log para verificar los resultados de la consulta
        console.log('Resultados de la consulta:', results);

        if (results.length === 0) {
            console.log('Usuario no encontrado:', usuario);
            return res.status(401).json({ error: 'Credenciales incorrectas.' });
        }

        const user = results[0];
        console.log('Usuario encontrado:', user); // Para depuración

        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            console.log('Contraseña incorrecta para el usuario:', usuario);
            return res.status(401).json({ error: 'Credenciales incorrectas.' });
        }

        // Generar un token JWT que incluya el rol
        const token = jwt.sign({ id: user.id, rol: user.rol }, jwtSecret, { expiresIn: jwtExpiresIn });
        res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (err) {
        console.error('Error al buscar el usuario:', err.message);
        return res.status(500).json({ error: 'Error al buscar el usuario.' });
    }
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Se requiere un token.' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido.' });
        }

        req.userId = decoded.id;
        req.userRol = decoded.rol; // Guarda el rol del usuario en la solicitud
        next();
    });
};

// Exportar las funciones
module.exports = {
    register,
    login,
    verifyToken,
};
