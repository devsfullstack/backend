const express = require('express');
const router = express.Router()
const controllers = require('../controllers/movimientos')
const path = require('path')

router.get('/movimientos', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/movimientos', controllers.create)
router.put('/movimientos', controllers.update)
router.delete('/movimientos', controllers.deleted)

module.exports = router;