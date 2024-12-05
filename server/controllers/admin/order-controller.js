const Order = require("../../models/Order"); // Importa o modelo Order

// Função para obter todos os pedidos de todos os usuários
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({}); // Busca todos os pedidos

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!", // Nenhum pedido encontrado
      });
    }

    res.status(200).json({
      success: true,
      data: orders, // Retorna os pedidos encontrados
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Algum erro ocorreu
    });
  }
};

// Função para obter detalhes de um pedido específico para o administrador
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id); // Busca o pedido pelo ID

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!", // Pedido não encontrado
      });
    }

    res.status(200).json({
      success: true,
      data: order, // Retorna os detalhes do pedido
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Algum erro ocorreu
    });
  }
};

// Função para atualizar o status de um pedido específico
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id); // Busca o pedido pelo ID

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!", // Pedido não encontrado
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus }); // Atualiza o status do pedido

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!", // Status do pedido atualizado com sucesso
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Algum erro ocorreu
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
}; // Exporta as funções para uso em outras partes da aplicação
