const express = require('express');
const router = express.Router()
const controllers = require('../controllers/registros')

router.get('/registros', controllers.getAll)
router.get('/registro', controllers.getOne)
router.post('/registro', controllers.create)
router.put('/registro', controllers.update)
router.delete('/registro', controllers.deleted)

module.exports = router;