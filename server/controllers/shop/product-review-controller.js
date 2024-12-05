const Order = require("../../models/Order"); // Importa o modelo Order
const Product = require("../../models/Product"); // Importa o modelo Product
const ProductReview = require("../../models/Review"); // Importa o modelo ProductReview

// Função para adicionar uma nova avaliação de produto
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body; // Obtém os dados do corpo da requisição

    // Verifica se o usuário comprou o produto antes de permitir a avaliação
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      // orderStatus: "confirmed" || "delivered",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.", // Você precisa comprar o produto para avaliá-lo
      });
    }

    // Verifica se o usuário já fez uma avaliação para este produto
    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!", // Você já avaliou este produto!
      });
    }

    // Cria uma nova avaliação de produto
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save(); // Salva a nova avaliação no banco de dados

    // Calcula a média das avaliações do produto
    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    // Atualiza a média das avaliações do produto no banco de dados
    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview, // Retorna a nova avaliação criada
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

// Função para obter todas as avaliações de um produto específico
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId }); // Busca todas as avaliações do produto
    res.status(200).json({
      success: true,
      data: reviews, // Retorna as avaliações encontradas
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

module.exports = { addProductReview, getProductReviews }; // Exporta as funções para uso em outras partes da aplicação
