const database = require("../models");
const uuid = require("uuid");

class RoleService {
  async cadastrar(dto) {
    const role = await database.roles.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (role) {
      throw new Error("Role já cadasrtrada");
    }

    try {
      const newRole = await database.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newRole;
    } catch (error) {
      throw new Error("Erro ao cadastrar role");
    }
  }

  async buscarTodasRoles() {
    try {
      const roles = await database.roles.findAll();

      if (!roles) {
        throw new Error("Não há roles cadastradas");
      }
      return roles;
    } catch (error) {
      throw new Error("Erro ao consultar roles");
    }
  }

  async buscaRolePorId(id) {
    const role = await database.roles.findOne({
      where: {
        id: id,
      },
    });
    if (role) {
      return role;
    } else {
      throw new Error("Role não encontrada");
    }
  }

  async deletarRole(id) {
    await this.buscaRolePorId(id);
    try {
      const role = await database.roles.destroy({
        where: {
          id: id,
        },
      });
      if (!role) {
        throw new Error("Role não encontrada");
      }
      return role;
    } catch (error) {
      throw new Error("Erro ao deletar a Role");
    }
  }
  async editarRole(dto) {
    try {
       const role = await this.buscaRolePorId(dto.id)
       role.nome = dto.nome
       role.descricao = dto.descricao
       role.save()
       return await role.reload()
    } catch (error) {
        throw new Error("Erro ao tentar editar a role")
    }
  }
}

module.exports = RoleService;
