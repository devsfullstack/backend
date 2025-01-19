const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/db'); // Asegúrate de que esta ruta sea correcta
const config = require('../config/config')

const tabla = 'usuarios';

// Función para registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { nombre, email, password, rol, cargo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = { nombre, email, password: hashedPassword, rol, cargo };
    
    const result = await pool.query(`INSERT INTO ${tabla} SET ?`, nuevoUsuario);
    res.json({ message: 'Usuario creado con éxito', id: result.insertId });
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

// Función para iniciar sesión
const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const [results] = await pool.query(`SELECT * FROM ${tabla} WHERE usuario = ?`, [usuario]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuarioValido = results[0];
    const isValid = await bcrypt.compare(password, usuarioValido.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuarioValido.id, rol: usuarioValido.rol }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'Se requiere un token.' });
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
    req.id_user = decoded.id;
    req.rol = decoded.rol; // Guarda el rol del usuario en la solicitud
    next();
  });
};

// Exportar las funciones
module.exports = {
  register,
  login,
  verifyToken,
};
