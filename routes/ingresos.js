const express = require('express');
const router = express.Router()
const controllers = require('../controllers/ingresos')
const path = require('path')

router.get('/ingresos', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/ingresos', controllers.create)
router.put('/ingresos', controllers.update)
router.delete('/ingresos', controllers.deleted)

module.exports = router;