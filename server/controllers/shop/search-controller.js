const Product = require("../../models/Product"); // Importa o modelo Product

// Função para buscar produtos
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params; // Obtém a palavra-chave dos parâmetros da requisição
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format", // A palavra-chave é obrigatória e deve estar no formato string
      });
    }

    const regEx = new RegExp(keyword, "i"); // Cria uma expressão regular para a palavra-chave, ignorando maiúsculas e minúsculas

    // Cria a consulta de busca utilizando a expressão regular
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery); // Busca os produtos que correspondem à consulta

    res.status(200).json({
      success: true,
      data: searchResults, // Retorna os resultados da busca
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

module.exports = { searchProducts }; // Exporta a função para uso em outras partes da aplicação
