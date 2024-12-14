const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/controllers'); // Asegúrate de que la ruta sea correcta

// Ruta para registrar un nuevo usuario
router.post('/register', register); // Usa 'register' directamente

// Ruta para iniciar sesión
router.post('/login', login); // Usa 'login' directamente

// Ruta protegida
router.get('/ruta-protegida', verifyToken, (req, res) => {
    if (req.userRol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado.' });
    }

    // Lógica para los usuarios admin
    res.json({ message: 'Acceso permitido para admin.' });
});

module.exports = router;
