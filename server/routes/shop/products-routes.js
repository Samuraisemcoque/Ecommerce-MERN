const express = require("express"); // Importa o módulo Express

const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/products-controller"); // Importa as funções do controlador de produtos

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para obter produtos filtrados
router.get("/get", getFilteredProducts);

// Define a rota para obter os detalhes de um produto específico
router.get("/get/:id", getProductDetails);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
