const UsuariosService = require("../services/usuarioService");

const usuarioService = new UsuariosService();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodosUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.buscarTodosUsuarios();
      res.status(200).send(usuarios);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscaPorId(req, res) {
    const id = req.params;

    try {
      const usuario = await usuarioService.buscaPorId(id);
      res.status(200).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async editarUsuario(req, res) {
    const { id } = req.params;
    
    const { nome, email } = req.body;
    try {
      const usuario = await usuarioService.editarUsuario({ nome, email, id });
      res.status(200).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
