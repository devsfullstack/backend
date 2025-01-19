const express = require('express');
const router = express.Router()
const controllers = require('../controllers/ingresos')

router.get('/ingresos', controllers.getAll)
router.get('/ingreso', controllers.getById)
router.post('/ingreso', controllers.create)
router.put('/ingreso', controllers.update)
router.delete('/ingreso', controllers.deleted)

module.exports = router;