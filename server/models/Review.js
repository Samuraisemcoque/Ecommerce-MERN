const mongoose = require("mongoose"); // Importa o módulo mongoose

// Define o esquema para o modelo ProductReview
const ProductReviewSchema = new mongoose.Schema(
  {
    productId: String, // ID do produto sendo avaliado
    userId: String, // ID do usuário que fez a avaliação
    userName: String, // Nome do usuário que fez a avaliação
    reviewMessage: String, // Mensagem da avaliação
    reviewValue: Number, // Valor da avaliação (nota dada ao produto)
  },
  { timestamps: true } // Adiciona os campos createdAt e updatedAt automaticamente
);

module.exports = mongoose.model("ProductReview", ProductReviewSchema); // Exporta o modelo ProductReview baseado no ProductReviewSchema
