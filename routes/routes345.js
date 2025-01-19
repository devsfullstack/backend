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

// Ruta para obtener el resumen total
router.get('/resumen', (req, res) => {
    db.query('SELECT * FROM resumen LIMIT 1', (err, result) => {
      if (err) return res.status(500).send('Error al obtener resumen');
      res.json(result[0]);  // Enviamos el primer registro del resumen
    });
  });
  
  // Ruta para obtener las compras
  router.get('/compras', (req, res) => {
    db.query('SELECT SUM(total) AS total_compras FROM compras', (err, result) => {
      if (err) return res.status(500).send('Error al obtener compras');
      res.json(result[0]);  // Enviamos el total de compras
    });
  });
  
  // Ruta para obtener los gastos
  router.get('/gastos', (req, res) => {
    db.query('SELECT SUM(monto) AS total_gastos FROM gastos', (err, result) => {
      if (err) return res.status(500).send('Error al obtener gastos');
      res.json(result[0]);  // Enviamos el total de gastos
    });
  });
  
  // Ruta para obtener las ventas
  router.get('/api/ventas', (req, res) => {
    db.query('SELECT SUM(total) AS total_ventas, COUNT(*) AS cantidad_ventas FROM ventas', (err, result) => {
      if (err) return res.status(500).send('Error al obtener ventas');
      res.json(result[0]);  // Enviamos el total de ventas y la cantidad de ventas
    });
  });
  
  router.get('/totalACobrar', (req, res) => {
    db.query('SELECT SUM(cantidad) AS totalACobrar FROM ventas WHERE estado = "pendiente"', (err, result) => {
      if (err) {
        console.error('Error al obtener total a cobrar:', err);
        return res.status(500).send('Error al obtener total a cobrar');
      }
      res.json({ totalACobrar: result[0].totalACobrar });
    });
  });
  
  router.get('/totalAPagar', (req, res) => {
    db.query('SELECT SUM(cantidad) AS totalAPagar FROM compras WHERE estado = "pendiente"', (err, result) => {
      if (err) {
        console.error('Error al obtener total a pagar:', err);
        return res.status(500).send('Error al obtener total a pagar');
      }
      res.json({ totalAPagar: result[0].totalAPagar });
    });
  });
module.exports = router;
