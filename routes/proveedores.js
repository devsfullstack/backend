const express = require('express');
const router = express.Router()
const controllers = require('../controllers/proveedores')
const path = require('path')

router.get('/proveedores', controllers.getAll)
router.get('/proveedor', controllers.getOne)
router.post('/proveedore', controllers.create)
router.put('/proveedore', controllers.update)
router.delete('/proveedore', controllers.deleted)

module.exports = router;