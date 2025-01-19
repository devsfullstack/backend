const express = require('express');
const router = express.Router()
const controllers = require('../controllers/registros')

router.get('/registros', controllers.getAll)
router.get('/registro', controllers.getById)

module.exports = router;