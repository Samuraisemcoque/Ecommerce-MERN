const express = require("express"); // Importa o módulo Express

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller"); // Importa funções do controlador de produtos do administrador

const { upload } = require("../../helpers/cloudinary"); // Importa a configuração de upload do Cloudinary

const router = express.Router(); // Cria uma nova instância do roteador Express

// Define a rota para fazer upload de uma imagem
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// Define a rota para adicionar um novo produto
router.post("/add", addProduct);

// Define a rota para editar um produto específico
router.put("/edit/:id", editProduct);

// Define a rota para deletar um produto específico
router.delete("/delete/:id", deleteProduct);

// Define a rota para obter todos os produtos
router.get("/get", fetchAllProducts);

module.exports = router; // Exporta o roteador para uso em outras partes da aplicação
