const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth'); // Asegúrate de que la ruta sea correcta

// Ruta para registrar un nuevo usuario
router.post('/register', controllers.register); // Usa 'register' directamente

// Ruta para iniciar sesión
router.post('/login', controllers.login); // Usa 'login' directamente

// Ruta protegida
router.get('/ruta-protegida', controllers.verifyToken, (req, res) => {
    if (req.userRol !== 'admin') {
        return res.status(403).json({ 
            error: 'Acceso denegado.' 
        });
    }

    // Lógica para los usuarios admin
    return res.status(200).json({ 
        message: 'Acceso permitido para admin.' 
    });
});

// Ruta para obtener el usuario logueado desde la base de datos
router.get('/api/usuario-logueado', (req, res) => {
    try {
        // Obtener el token del header de autorización
        const token = req.headers.authorization.split(' ')[1];
        // Decodificar el token para obtener el ID de usuario
        const decoded = jwt.verify(token, 'clave_secreta'); // Reemplaza 'clave_secreta' con tu clave secreta real
        const userId = decoded.u1_id; // Suponiendo que el token tiene el campo u1_id que representa el ID del usuario
  
        // Consultar la base de datos para obtener el nombre de usuario
        const [rows] = db.execute('SELECT usuario FROM usuarios WHERE u1_id = ?', [userId]);
  
        // Verificar si se encontró un usuario con el ID proporcionado
        if (rows.length > 0) {
            res.json({ username: rows[0].usuario });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

module.exports = router;
