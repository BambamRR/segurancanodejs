const { Router } = require('express')

const RoleController = require('../controllers/roleController')

const router = Router()


router
    .post('/role', RoleController.cadastrar)
    .get('/role', RoleController.buscarTodasRoles)
    .get('/role/:id', RoleController.buscaRolePorId)
    .delete('/role/:id', RoleController.deletarRole)
    .put('/role/:id', RoleController.editarRole)

module.exports = router