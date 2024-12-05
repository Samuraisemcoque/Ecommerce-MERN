const express = require("express"); // Importa o módulo Express

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controller"); // Importa as funções do controlador de endereços

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para adicionar um novo endereço
router.post("/add", addAddress);

// Define a rota para buscar todos os endereços de um usuário específico
router.get("/get/:userId", fetchAllAddress);

// Define a rota para deletar um endereço específico de um usuário
router.delete("/delete/:userId/:addressId", deleteAddress);

// Define a rota para atualizar um endereço específico de um usuário
router.put("/update/:userId/:addressId", editAddress);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
