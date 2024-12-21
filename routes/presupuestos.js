const express = require('express');
const router = express.Router()
const controllers = require('../controllers/presupuestos')
const path = require('path')

router.get('/presupuestos', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/presupuestos', controllers.create)
router.put('/presupuestos', controllers.update)
router.delete('/presupuestos', controllers.deleted)

module.exports = router;