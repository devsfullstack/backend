const express = require('express');
const router = express.Router()
const controllers = require('../controllers/egresos')

router.get('/egresos', controllers.getAll)
router.get('/egreso', controllers.getById)
router.post('/egreso', controllers.create)
router.put('/egreso', controllers.update)
router.delete('/egreso', controllers.deleted)

module.exports = router;