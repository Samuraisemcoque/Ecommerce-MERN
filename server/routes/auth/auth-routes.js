const express = require("express"); // Importa o módulo Express
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller"); // Importa as funções do controlador de autenticação

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para registrar um novo usuário
router.post("/register", registerUser);

// Define a rota para fazer login de um usuário
router.post("/login", loginUser);

// Define a rota para fazer logout de um usuário
router.post("/logout", logoutUser);

// Define a rota para verificar a autenticação do usuário, utilizando o middleware de autenticação
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user; // Obtém o usuário autenticado do objeto de requisição
  res.status(200).json({
    success: true,
    message: "Authenticated user!", // Usuário autenticado
    user,
  });
});

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
