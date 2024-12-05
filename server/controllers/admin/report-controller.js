const Order = require("../../models/Order"); // Importa o modelo Order

// Função para gerar relatório de vendas
const generateSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  const query = {};

  if (startDate && endDate) {
    query.orderDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  console.log("Query applied:", query); // Log dos critérios de consulta

  try {
    const salesReport = await Order.aggregate([
      { $match: query },
      {
        $unwind: "$cartItems", // Desagregar os itens do carrinho
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" }, // Soma total das vendas
          averageSales: { $avg: "$totalAmount" }, // Média das vendas
          totalOrders: { $sum: 1 }, // Total de pedidos
          totalQuantity: { $sum: "$cartItems.quantity" }, // Somar a quantidade de itens do carrinho
        },
      },
    ]);

    console.log("Sales Report Generated:", salesReport); // Log para verificar os dados

    res.status(200).json({
      success: true,
      data: salesReport[0] || { 
        totalSales: 0,
        averageSales: 0,
        totalOrders: 0,
        totalQuantity: 0,
      }, // Retorna o relatório de vendas gerado
    });
  } catch (error) {
    console.error("Erro ao gerar relatório de vendas", error);
    res.status(500).json({
      success: false,
      message: "Error generating sales report", // Erro ao gerar relatório de vendas
    });
  }
};

// Função para gerar relatório de inventário
const generateInventoryReport = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory report not implemented yet", // Relatório de inventário ainda não implementado
  });
};

// Função para gerar relatório de atividade do usuário
const generateUserActivityReport = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User activity report not implemented yet", // Relatório de atividade do usuário ainda não implementado
  });
};

module.exports = {
  generateSalesReport,
  generateInventoryReport,
  generateUserActivityReport,
}; // Exporta as funções para uso em outras partes da aplicação
