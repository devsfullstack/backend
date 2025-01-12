const express = require('express');
const router = express.Router()
const controllers = require('../controllers/movimientos')

router.get('/movimientos', controllers.getAll)
router.get('/movimiento', controllers.getOne)
router.post('/movimiento', controllers.create)
router.put('/movimiento', controllers.update)
router.delete('/movimiento', controllers.deleted)

module.exports = router;