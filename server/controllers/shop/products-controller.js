const Product = require("../../models/Product"); // Importa o modelo Product

// Função para obter produtos filtrados
const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query; // Obtém os parâmetros de filtro da requisição

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") }; // Filtra produtos pela categoria
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") }; // Filtra produtos pela marca
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1; // Ordena por preço do menor para o maior
        break;
      case "price-hightolow":
        sort.price = -1; // Ordena por preço do maior para o menor
        break;
      case "title-atoz":
        sort.title = 1; // Ordena por título de A a Z
        break;
      case "title-ztoa":
        sort.title = -1; // Ordena por título de Z a A
        break;
      default:
        sort.price = 1; // Ordena por preço do menor para o maior por padrão
        break;
    }

    const products = await Product.find(filters).sort(sort); // Busca os produtos aplicando filtros e ordenação

    res.status(200).json({
      success: true,
      data: products, // Retorna os produtos filtrados e ordenados
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured", // Algum erro ocorreu
    });
  }
};

// Função para obter detalhes de um produto específico
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do produto dos parâmetros da requisição
    const product = await Product.findById(id); // Busca o produto pelo ID

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!", // Produto não encontrado
      });

    res.status(200).json({
      success: true,
      data: product, // Retorna os detalhes do produto encontrado
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured", // Algum erro ocorreu
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails }; // Exporta as funções para uso em outras partes da aplicação
