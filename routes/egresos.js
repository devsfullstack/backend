const express = require('express');
const router = express.Router()
const controllers = require('../controllers/egresos')
const path = require('path')

router.get('/egresos', controllers.getAll)
router.get(path.join('/'+'?:id'), controllers.getOne)
router.post('/egresos', controllers.create)
router.put('/egresos', controllers.update)
router.delete('/egresos', controllers.deleted)

module.exports = router;