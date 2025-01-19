const express = require('express');
const router = express.Router()
const controllers = require('../controllers/Estadisticas')

router.get('/estadisticas', controllers.getStats)

module.exports = router;