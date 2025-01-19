const express = require('express');
const router = express.Router()
const controllers = require('../controllers/categorias')

router.get('/categorias', controllers.getAll)
router.get('/categoria', controllers.getById)
router.post('/categoria', controllers.create)
router.put('/categorias', controllers.update)
router.delete('/categorias', controllers.deleted)


module.exports = router;