const express = require('express');
const router = express.Router()
const controllers = require('../controllers/clientes')

router.get('/clientes', controllers.getAll)
router.get('/cliente', controllers.getOne)
router.post('/clientes', controllers.create)
router.put('/clientes', controllers.update)
router.delete('/clientes', controllers.deleted)

module.exports = router;