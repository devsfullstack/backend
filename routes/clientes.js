const express = require('express');
const router = express.Router()
const controllers = require('../controllers/clientes')
const path = require('path')

router.get('/clientes', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/clientes', controllers.create)
router.put('/clientes', controllers.update)
router.delete('/clientes', controllers.deleted)

module.exports = router;