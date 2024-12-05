const mongoose = require("mongoose"); // Importa o módulo mongoose

// Define o esquema para o modelo Product
const ProductSchema = new mongoose.Schema(
  {
    image: String, // URL da imagem do produto
    title: String, // Título do produto
    description: String, // Descrição do produto
    category: String, // Categoria do produto
    brand: String, // Marca do produto
    price: Number, // Preço do produto
    salePrice: Number, // Preço promocional do produto
    totalStock: Number, // Estoque total do produto
    averageReview: Number, // Média das avaliações do produto
  },
  { timestamps: true } // Adiciona os campos createdAt e updatedAt automaticamente
);

module.exports = mongoose.model("Product", ProductSchema); // Exporta o modelo Product baseado no ProductSchema
