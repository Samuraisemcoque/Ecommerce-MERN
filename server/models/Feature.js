const mongoose = require("mongoose"); // Importa o módulo mongoose

// Define o esquema para o modelo Feature
const FeatureSchema = new mongoose.Schema(
  {
    image: String, // URL da imagem em destaque
  },
  { timestamps: true } // Adiciona os campos createdAt e updatedAt automaticamente
);

module.exports = mongoose.model("Feature", FeatureSchema); // Exporta o modelo Feature baseado no FeatureSchema
