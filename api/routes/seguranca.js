const { Router } = require('express')
const router = Router()

const SegurancaController = require('../controllers/segurancaController')

router
    .post('/seguranca/acl', SegurancaController.cadastrarAcl)



module.exports = router