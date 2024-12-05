const mongoose = require("mongoose"); // Importa o módulo mongoose

// Define o esquema para o modelo Cart
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Define o tipo como ObjectId do Mongoose
      ref: "User", // Faz referência ao modelo User
      required: true, // Campo obrigatório
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Define o tipo como ObjectId do Mongoose
          ref: "Product", // Faz referência ao modelo Product
          required: true, // Campo obrigatório
        },
        quantity: {
          type: Number, // Define o tipo como Number
          required: true, // Campo obrigatório
          min: 1, // Valor mínimo de 1
        },
      },
    ],
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt automaticamente
  }
);

module.exports = mongoose.model("Cart", CartSchema); // Exporta o modelo Cart baseado no CartSchema
