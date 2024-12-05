const express = require("express"); // Importa o módulo Express

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller"); // Importa funções do controlador de pedidos do administrador

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para obter todos os pedidos de todos os usuários
router.get("/get", getAllOrdersOfAllUsers); 

// Define a rota para obter os detalhes de um pedido específico para o administrador
router.get("/details/:id", getOrderDetailsForAdmin);

// Define a rota para atualizar o status de um pedido específico
router.put("/update/:id", updateOrderStatus);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
