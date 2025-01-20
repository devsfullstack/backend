const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/db'); // Asegúrate de que esta ruta sea correcta
const config = require('../config/config')

const tabla = 'usuarios'
const tabla2 = 'registros'

// Función para registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { usuario, nombre, email, contraseña, rol, cargo } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = { usuario, nombre, email, contraseña: hashedPassword, rol, cargo };
    

    const result = await pool.query(`INSERT INTO ${tabla} SET ?`, [nuevoUsuario]);
    await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) values(?,?,?)`, ["Crear", tabla, usuario]);
    res.json({ 
      message: 'Usuario creado con éxito'
    });
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

// Función para iniciar sesión
const login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Verificar que usuario y password estén definidos
    if (!usuario || !contraseña) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const [results] = await pool.query(`SELECT * FROM ${tabla} WHERE usuario = ?`, [usuario]);
    
    // Verificar que se haya encontrado el usuario
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuarioValido = results[0];

    // Agregar logs para verificar el contenido de usuarioValido
    console.log('Usuario encontrado:', usuarioValido);

    // Verificar que la contraseña del usuario esté definida
    if (!usuarioValido.contraseña) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    // Agregar logs para verificar el contenido de la contraseña
    console.log('Contraseña ingresada:', contraseña);
    console.log('Contraseña almacenada:', usuarioValido.contraseña);

    const isValid = await bcrypt.compare(contraseña, usuarioValido.contraseña);
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
    req.id = decoded.id;
    req.rol = decoded.rol; // Guarda el rol del usuario en la solicitud
    next();
  });
};


const getAll = async (req, res) => {
    try {
        const usuario = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`);
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) VALUES (?,?,?)`, ['Listar todo', tabla, req.usuario]);
        return res.status(200).json(usuario[0]);
        
        } catch (error) {
        res.json({ error: error.message });
        }
        }

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await pool.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) VALUES (?,?,?)`, ['Buscar usuario',tabla, req.usuario]); 
        

        if (usuario.rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            return res.status(200).json(usuario.rows[0]);
            }
            } catch (error) {
                return res.status(500).json({ error: error.message });
                }
                }

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await pool.query(`UPDATE ${tabla} SET nombre = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`, [nombre, email, hashedPassword, id]);
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) VALUES (?,?,?)`, ['Actualizar usuario',tabla, req.user]);
        if (usuario.rows.length === 0) {
            res.json({ error: 'Usuario no encontrado' });
            } else {
                res.json(usuario.rows[0]);
                }
                } catch (error) {
                    res.json({ error: error.message });
                    }
                    }

const deleted = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await pool.query(`DELETE FROM ${tabla} WHERE id = $1`, [id] );
        
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) VALUES (?,?,?)`, ['Eliminar usuario',tabla, req.user]);
        if (usuario.rows.length === 0) {
            res.json({ error: 'Usuario no encontrado' });
            } else {
                res.json({ message: 'Usuario eliminado' });
                }
                } catch (error) {
                    res.json({ error: error.message });
                    }
                    }


module.exports = {
    };

// Exportar las funciones
module.exports = {
  register,
  login,
  verifyToken,
  getAll,
  getById,
  update,
  deleted

};
