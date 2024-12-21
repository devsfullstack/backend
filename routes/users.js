const express = require('express');
const router = express.Router()
const controllers = require('../controllers/users')

router.get('/users', controllers.getAll)
router.get('/user', controllers.getOne)
router.post('/user', controllers.create),
router.put('/user', controllers.update),
router.delete('/user', controllers.deleted)

module.exports = router;
