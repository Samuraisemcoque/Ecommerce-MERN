const mongoose = require("mongoose"); // Importa o módulo mongoose

// Define o esquema para o modelo Address
const AddressSchema = new mongoose.Schema(
  {
    userId: String, // ID do usuário
    address: String, // Endereço
    city: String, // Cidade
    pincode: String, // Código postal
    phone: String, // Telefone
    notes: String, // Notas adicionais
  },
  { timestamps: true } // Adiciona os campos createdAt e updatedAt automaticamente
);

module.exports = mongoose.model("Address", AddressSchema); // Exporta o modelo Address baseado no AddressSchema
