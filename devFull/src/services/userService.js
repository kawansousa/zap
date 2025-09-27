// services/userService.js
const User = require("../models/user");

class UserService {
  constructor(whatsappService) {
    this.whatsappService = whatsappService;
  }
  // Criar usuário
  async createUser(data) {
    try {
      // salva no banco
      const user = await User.create(data);

      // envia mensagem no WhatsApp
      if (user.whatsappNumber) {
        await this.whatsappService.sendMessage(
          user.whatsappNumber,
          `Olá ${user.name}, seja bem-vindo ao sistema!`
        );
      }

      return user;
    } catch (error) {
      throw new Error("Erro ao criar usuário: " + error.message);
    }
  }

  // Autenticar usuário (simples, sem JWT por enquanto)
  async authenticateUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Usuário não encontrado");

      // ⚠️ Em produção use bcrypt! Aqui está direto por simplicidade
      if (user.password !== password) {
        throw new Error("Senha inválida");
      }

      return { id: user.id, email: user.email };
    } catch (error) {
      throw new Error("Erro ao autenticar: " + error.message);
    }
  }

  // Atualizar usuário
  async updateUser(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("Usuário não encontrado");

      await user.update(data);
      return user;
    } catch (error) {
      throw new Error("Erro ao atualizar usuário: " + error.message);
    }
  }

  // Buscar usuário por ID
  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("Usuário não encontrado");
      return user;
    } catch (error) {
      throw new Error("Erro ao buscar usuário: " + error.message);
    }
  }

  // Deletar usuário
  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("Usuário não encontrado");

      await user.destroy();
      return true;
    } catch (error) {
      throw new Error("Erro ao deletar usuário: " + error.message);
    }
  }
}

module.exports = UserService;
