const Feature = require("../../models/Feature"); // Importa o modelo Feature

// Função para adicionar uma nova imagem em destaque
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body; // Obtém a imagem do corpo da requisição

    console.log(image, "image");

    const featureImages = new Feature({
      image, // Cria uma nova instância do modelo Feature com a imagem fornecida
    });

    await featureImages.save(); // Salva a nova imagem em destaque no banco de dados

    res.status(201).json({
      success: true,
      data: featureImages, // Retorna a imagem em destaque recém-criada
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Algum erro ocorreu
    });
  }
};

// Função para obter todas as imagens em destaque
const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({}); // Busca todas as imagens em destaque

    res.status(200).json({
      success: true,
      data: images, // Retorna as imagens em destaque encontradas
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Algum erro ocorreu
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages }; // Exporta as funções para uso em outras partes da aplicação
