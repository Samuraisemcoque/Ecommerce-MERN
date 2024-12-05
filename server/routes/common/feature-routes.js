const express = require("express"); // Importa o módulo Express

const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controllers/common/feature-controller"); // Importa as funções do controlador de imagens em destaque

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para adicionar uma nova imagem em destaque
router.post("/add", addFeatureImage);

// Define a rota para obter todas as imagens em destaque
router.get("/get", getFeatureImages);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
