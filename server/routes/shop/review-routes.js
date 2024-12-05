const express = require("express"); // Importa o módulo Express

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller"); // Importa as funções do controlador de avaliações de produtos

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para adicionar uma nova avaliação de produto
router.post("/add", addProductReview);

// Define a rota para obter todas as avaliações de um produto específico
router.get("/:productId", getProductReviews);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
