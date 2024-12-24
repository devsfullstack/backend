const express = require('express');
const router = express.Router()
const controllers = require('../controllers/categorias')
const path = require('path')

router.get('/categorias', controllers.getAll)
router.post('/categorias', controllers.create)
router.put('/categorias', controllers.update)
router.delete('/categorias', controllers.deleted)


module.exports = router;