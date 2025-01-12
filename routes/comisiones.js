const express = require('express');
const router = express.Router()
const controllers = require('../controllers/comisiones')

router.get('/comisiones', controllers.getAll)
router.get('/comision', controllers.getOne)
router.post('/comision', controllers.create)
router.put('/comision', controllers.update)
router.delete('/comision', controllers.deleted)

module.exports = router;