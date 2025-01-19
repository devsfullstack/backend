const express = require('express');
const router = express.Router()
const controllers = require('../controllers/presupuestos')

router.get('/presupuestos', controllers.getAll)
router.get('/presupuesto', controllers.getById)
router.post('/presupuesto', controllers.create)
router.put('/presupuesto', controllers.update)
router.delete('/presupuesto', controllers.deleted)

module.exports = router;