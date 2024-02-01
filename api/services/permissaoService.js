const database = require("../models");
const uuid = require("uuid");

class PermissaoService {
  async cadastrar(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (permissao) {
      throw new Error("Permissão já cadastrada");
    }

    try {
      const newPermissao = await database.permissoes.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newPermissao;
    } catch (error) {
      throw new Error("Erro cadastrar permissão");
    }
  }

  async buscarTodasPermissoes() {
    try {
      const permissao = await database.permissoes.findAll();
      if (!permissao) {
        throw new Error("Nenhuma permissão cadastrada");
      }
      return permissao;
    } catch (error) {
      throw new Error("Não foi possível buscar as permissões.");
    }
  }
  async buscaPermissaoPorId(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });

    if (!permissao) {
      throw new Error("ID Não existe na base da dados");
    }

    return permissao;
  }

  async deletaPermissao(id) {
    await this.buscaPermissaoPorId(id);

    try {
      const permissao = await database.permissoes.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Erro ao deletar permissão");
    }
  }
  async editarPermissao(dto) {
    try {
      await this.buscaPermissaoPorId(dto.id);
    console.log("Permissa -------------- ")

      const permissao = await database.permissoes.findOne({
        where: {
          id: dto.id,
        },
      });

      permissao.nome = dto.nome;
      permissao.descricao = dto.descricao;
      permissao.save();

      return await permissao.reload();
    } catch (error) {
      throw new Error("Erro ao editar permissão");
    }
  }
}

module.exports = PermissaoService;
