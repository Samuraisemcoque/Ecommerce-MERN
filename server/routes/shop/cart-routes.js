const express = require("express"); // Importa o módulo Express

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller"); // Importa as funções do controlador de carrinho de compras

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para adicionar um item ao carrinho
router.post("/add", addToCart);

// Define a rota para buscar todos os itens do carrinho de um usuário específico
router.get("/get/:userId", fetchCartItems);

// Define a rota para atualizar a quantidade de um item no carrinho
router.put("/update-cart", updateCartItemQty);

// Define a rota para deletar um item específico do carrinho de um usuário
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
