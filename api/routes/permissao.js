const { Router } = require('express')
const permissaoController = require('../controllers/permissaoController')


const router = Router()

router
    .post('/permissao', permissaoController.cadastrar)
    .get('/permissao', permissaoController.buscarTodasPermissoes)
    .get('/permissao/:id', permissaoController.buscaPermissaoPorId)
    .delete('/permissao/:id', permissaoController.deletaPermissao)
    .put('/permissao/:id', permissaoController.editarPermissao)


module.exports = router;