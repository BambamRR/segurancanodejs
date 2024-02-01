const PermissaoService = require("../services/permissaoService");
const permissaoService = new PermissaoService();

class PermissaoController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const permissao = await permissaoService.cadastrar({ nome, descricao });

      res.status(201).send(permissao);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async buscarTodasPermissoes(req, res) {
    try {
      const permissao = await permissaoService.buscarTodasPermissoes();
      res.status(200).json(permissao);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async buscaPermissaoPorId(req, res) {
    const { id } = req.params;
    try {
      const permissao = await permissaoService.buscaPermissaoPorId(id);
      res.status(200).send(permissao);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async deletaPermissao(req, res) {
    const { id } = req.params;
    try {
      const permissao = await permissaoService.deletaPermissao(id);
      res.status(200).send(permissao);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async editarPermissao(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body
    try {
      const permissao = await permissaoService.editarPermissao({id, nome, descricao});
      res.status(200).send(permissao);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissaoController;
''