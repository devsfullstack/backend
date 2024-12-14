const jwt = require('../config/jwtutils');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No se proporcionó un token de autenticación.' });
    }

    const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    jwt.verify(cleanToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token no válido.' });
        }
        
        req.userId = decoded.id; // Almacena la información decodificada
        next();
    });
};

module.exports = authMiddleware;
