const { imageUploadUtil } = require("../../helpers/cloudinary"); // Importa o utilitário de upload de imagens do Cloudinary
const Product = require("../../models/Product"); // Importa o modelo Product

// Função para lidar com o upload de imagens
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64"); // Converte o buffer da imagem para base64
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url); // Faz o upload da imagem para o Cloudinary

    res.json({
      success: true,
      result, // Retorna o resultado do upload
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured", // Erro ocorreu
    });
  }
};

// Função para adicionar um novo produto
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedProduct.save(); // Salva o novo produto no banco de dados
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct, // Retorna o produto recém-criado
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured", // Erro ocorreu
    });
  }
};

// Função para buscar todos os produtos
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({}); // Busca todos os produtos
    res.status(200).json({
      success: true,
      data: listOfProducts, // Retorna a lista de produtos
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured", // Erro ocorreu
    });
  }
};

// Função para editar um produto específico
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found", // Produto não encontrado
      });

    // Atualiza os campos do produto com os novos valores, se fornecidos
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save(); // Salva as alterações no banco de dados
    res.status(200).json({
      success: true,
      data: findProduct, // Retorna o produto atualizado
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured", // Erro ocorreu
    });
  }
};

// Função para deletar um produto específico
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id); // Deleta o produto pelo ID

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found", // Produto não encontrado
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully", // Produto deletado com sucesso
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured", // Erro ocorreu
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
}; // Exporta as funções para uso em outras partes da aplicação
