const express = require('express');
const router = express.Router()
const controllers = require('../controllers/cuentas')

router.get('/cuentas', controllers.getAll)
router.get('/cuenta', controllers.getOne)
router.post('/cuenta', controllers.create)
router.put('/cuenta', controllers.update)
router.delete('/cuenta', controllers.deleted)

module.exports = router;