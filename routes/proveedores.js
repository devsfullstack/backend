const express = require('express');
const router = express.Router()
const controllers = require('../controllers/proveedores')
const path = require('path')

router.get('/proveedores', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/proveedores', controllers.create)
router.put('/proveedores', controllers.update)
router.delete('/proveedores', controllers.deleted)

module.exports = router;