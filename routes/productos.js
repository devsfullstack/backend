const express = require('express');
const router = express.Router()
const controllers = require('../controllers/productos')

router.get('/productos', controllers.getAll)
router.get('/producto', controllers.getById)
router.post('/producto', controllers.create)
router.put('/producto', controllers.update)
router.delete('/producto', controllers.deleted)

module.exports = router;