const express = require("express"); // Importa o módulo Express

const {
  generateSalesReport,
  generateInventoryReport,
  generateUserActivityReport,
} = require("../../controllers/admin/report-controller"); // Importa funções do controlador de relatórios do administrador

const { authMiddleware } = require("../../controllers/auth/auth-controller"); // Importa o middleware de autenticação
const admin = require("../../middleware/admin"); // Importa o middleware de verificação de administrador

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para gerar relatório de vendas, requer autenticação e verificação de administrador
router.get("/sales", authMiddleware, admin, generateSalesReport);

// Define a rota para gerar relatório de inventário, requer autenticação e verificação de administrador
router.get("/inventory", authMiddleware, admin, generateInventoryReport);

// Define a rota para gerar relatório de atividade do usuário, requer autenticação e verificação de administrador
router.get("/user-activity", authMiddleware, admin, generateUserActivityReport);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
