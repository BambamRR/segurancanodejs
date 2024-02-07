const database = require("../models");
const { hash } = require("bcryptjs");
const uuid = require("uuid");

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await database.usuarios.findOne({
      where: {
        email: dto.email,
      },
    });
    if (usuario) {
      throw new Error("Usuário já cadastrado");
    }

    try {
      const senhaHash = await hash(dto.senha, 8);

      const novoUsuario = await database.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      return novoUsuario;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário");
    }
  }

  async buscarTodosUsuarios() {
    const usuarios = await database.usuarios.findAll({
      include: [
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome"],
          through: {
            attributes: [],
          },
        },
      ],
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return usuarios;
  }

  async buscaPorId(id) {
    const usuario = await database.usuarios.findOne({
      where: {
        id: id,
      },
    });
    if (usuario) {
      return usuario;
    } else {
      throw new Error("Usuário não encontrado");
    }
  }
  async editarUsuario(dto) {
    const { id } = dto.id;

    console.log(id);

    const usuario = await this.buscaPorId(id);

    try {
      usuario.nome = dto.nome;
      usuario.email = dto.email;
      await usuario.save();
      return usuario;
    } catch (error) {
      throw new Error("Erro ao editar usuario!");
    }
  }
  async deletarUsuario(id) {
    console.log("Entrou no serviceDelete ID: ", id);
    await this.buscaPorId(id);
    try {
      await database.usuarios.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}

module.exports = UsuarioService;
