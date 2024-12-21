const express = require('express');
const router = express.Router()
const controllers = require('../controllers/comisiones')
const path = require('path')

router.get('/comisiones', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/comisiones', controllers.create)
router.put('/comisiones', controllers.update)
router.delete('/comisiones', controllers.deleted)

module.exports = router;