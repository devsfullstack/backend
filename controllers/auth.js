const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db'); // Asegúrate de que esta ruta sea correcta
const config = require('../config/config')

const tabla = 'usuarios'
// Función para registrar un nuevo usuario
const register = (req, res) => {
    const { nombre, apellido, usuario, contraseña, email, cargo, rol } = req.body; // Agregar rol

    if(err) {
        console.error('Error al registrar el usuario:', err.message);
        return res.status(500).json({ error: 'Error al registrar el usuario.' });
    }else{
    // Verificar que todos los campos estén presentes
    if (!nombre || !apellido || !usuario || !contraseña || !email || !cargo || !rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }else{
        // Verificar si el usuario ya existe
        const existingUserQuery = (`SELECT * FROM ${tabla} WHERE usuario = '${usuario}' OR email = '${email}'`);
        db.query(existingUserQuery, (err, results)=>{
            if (err) {
                return res.status(500).json({ error: 'Error al verificar usuario.' });
                }
                else if (results.length > 0) {
                    return res.status(400).json({ error: 'El usuario ya existe.' });
                }else{
                    // Hashear la contraseña
                    const hashedPassword = bcrypt.hash(contraseña, 10);

                    // Consultar la base de datos para registrar el nuevo usuario
                    const insertQuery = (`INSERT INTO ${tabla} (nombre, apellido, usuario, contraseña, email, cargo, rol, fecha_ingreso) VALUES ("${nombre}", "${apellido}", "${usuario}", "${hashedPassword}", "${email}", "${cargo}", "${rol}");
`);
                    db.query(insertQuery, (err, results) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error al registrar usuario.' });
                            } else {
                                return res.status(201).json({ message: 'Usuario registrado con éxito.',
                                    results
                                 });
                                }
                                });
                }
            })
                    
        }}
        
    }


// Función para iniciar sesión
const login = (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }else{
        const query = (`SELECT * FROM ${tabla} WHERE usuario = '${usuario}'`);
        db.query(query, (err, results)=>{
            if (err) {
                console.error('Error al buscar el usuario:', err);
                return res.status(500).json({ error: 'Error al buscar el usuario.' });
            }else{
                if (results.length === 0) {
                    console.log('Datos incorrectos')
                    console.log(`Usuario no encontrado: ${usuario}`);
                    return res.status(401).json({ error: 'Credenciales incorrectas.' });
                } else {    
                    const isPasswordValid = bcrypt.compare(contraseña, usuario.contraseña);
                    if (!isPasswordValid) {
                        console.log(`Contraseña incorrecta para el usuario:, ${usuario}`);
                        return res.status(401).json({ error: 'Credenciales incorrectas.' });
                    }else{
            
                    // Generar un token JWT que incluya el rol
                    const token = jwt.sign({ 
                        id: usuario.id, 
                        rol: usuario.rol 
                    }, 
                    config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
                    res.status(200).json({ 
                        message: 'Inicio de sesión exitoso.', 
                        token 
                    });
                } 
        
}}})
        }};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Se requiere un token.' });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido.' });
        }else{

        req.id_user = decoded.id_user;
        req.rol = decoded.rol; // Guarda el rol del usuario en la solicitud
        next();
        }
    });
};

// Exportar las funciones
module.exports = {
    register,
    login,
    verifyToken,
};
