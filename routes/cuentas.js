const express = require('express');
const router = express.Router()
const controllers = require('../controllers/cuentas')
const path = require('path')

router.get('/cuentas', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/cuentas', controllers.create)
router.put('/cuentas', controllers.update)
router.delete('/cuentas', controllers.deleted)

module.exports = router;