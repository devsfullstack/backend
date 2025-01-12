const express = require('express');
const router = express.Router()
const controllers = require('../controllers/facturas')

router.get('/facturas', controllers.getAll)
router.get('/factura', controllers.getOne)
router.post('/factura', controllers.create)
router.put('/factura', controllers.update)
router.delete('/factura', controllers.deleted)

module.exports = router;