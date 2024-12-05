const Cart = require("../../models/Cart"); // Importa o modelo Cart
const Product = require("../../models/Product"); // Importa o modelo Product

// Função para adicionar um item ao carrinho
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body; // Obtém os dados do corpo da requisição

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Dados inválidos fornecidos
      });
    }

    const product = await Product.findById(productId); // Busca o produto pelo ID

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found", // Produto não encontrado
      });
    }

    let cart = await Cart.findOne({ userId }); // Busca o carrinho do usuário pelo ID

    if (!cart) {
      cart = new Cart({ userId, items: [] }); // Cria um novo carrinho se não existir
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity }); // Adiciona o item ao carrinho se não estiver presente
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity; // Atualiza a quantidade do item se já estiver presente
    }

    await cart.save(); // Salva o carrinho no banco de dados
    res.status(200).json({
      success: true,
      data: cart, // Retorna o carrinho atualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

// Função para buscar todos os itens do carrinho de um usuário específico
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory!", // ID do usuário é obrigatório
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice", // Popula os dados do produto no carrinho
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!", // Carrinho não encontrado
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save(); // Atualiza o carrinho removendo itens inválidos
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems, // Retorna os itens do carrinho populados
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

// Função para atualizar a quantidade de um item no carrinho
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Dados inválidos fornecidos
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!", // Carrinho não encontrado
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present!", // Item do carrinho não encontrado
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity; // Atualiza a quantidade do item no carrinho
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice", // Popula os dados do produto no carrinho
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems, // Retorna os itens do carrinho populados
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

// Função para deletar um item do carrinho
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Dados inválidos fornecidos
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice", // Popula os dados do produto no carrinho
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!", // Carrinho não encontrado
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice", // Popula os dados do produto no carrinho
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems, // Retorna os itens do carrinho populados
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
}; // Exporta as funções para uso em outras partes da aplicação
