const express = require('express');
const router = express.Router()
const controllers = require('../controllers/productos')
const path = require('path')

router.get('/productos', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/productos', controllers.create)
router.put('/productos', controllers.update)
router.delete('/productos', controllers.deleted)

module.exports = router;