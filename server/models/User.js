const mongoose = require("mongoose"); // Importa o módulo mongoose

// Define o esquema para o modelo User
const UserSchema = new mongoose.Schema({
  userName: {
    type: String, // Tipo String para o nome de usuário
    required: true, // Campo obrigatório
    unique: true, // Deve ser único no banco de dados
  },
  email: {
    type: String, // Tipo String para o email
    required: true, // Campo obrigatório
    unique: true, // Deve ser único no banco de dados
  },
  password: {
    type: String, // Tipo String para a senha
    required: true, // Campo obrigatório
  },
  role: {
    type: String, // Tipo String para o papel do usuário
    default: "user", // Valor padrão é "user"
  },
});

const User = mongoose.model("User", UserSchema); // Cria o modelo User baseado no UserSchema
module.exports = User; // Exporta o modelo User para uso em outras partes da aplicação
