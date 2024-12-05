const express = require("express"); // Importa o módulo Express

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller"); // Importa as funções do controlador de pedidos

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para criar um novo pedido
router.post("/create", createOrder);

// Define a rota para capturar o pagamento de um pedido
router.post("/capture", capturePayment);

// Define a rota para buscar todos os pedidos de um usuário específico
router.get("/list/:userId", getAllOrdersByUser);

// Define a rota para buscar os detalhes de um pedido específico
router.get("/details/:id", getOrderDetails);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
