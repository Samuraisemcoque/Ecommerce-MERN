const express = require("express"); // Importa o módulo Express

const { searchProducts } = require("../../controllers/shop/search-controller"); // Importa a função do controlador de busca de produtos

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para buscar produtos com base em uma palavra-chave
router.get("/:keyword", searchProducts);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
