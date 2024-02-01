const RoleService = require("../services/roleService");
const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.cadastrar({ nome, descricao });
      res.status(201).send(role);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async buscarTodasRoles(req, res) {
    try {
      const roles = await roleService.buscarTodasRoles();
      res.status(200).send(roles);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async buscaRolePorId(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.buscaRolePorId(id);
      res.status(200).send(role);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async deletarRole(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.deletarRole(id);

      res.status(200).send({message: "Deletado", role})

    } catch (error) {
        res.status(400).send(error.message)
    }
  }

  static async editarRole(req, res) {
    const { id } = req.params
    const { nome, descricao } = req.body
     try {
        const role = await roleService.editarRole({id, nome, descricao})
        res.status(200).send(role)
     } catch (error) {
        res.status(400).send(error.message)
     }
  }
}

module.exports = RoleController;
