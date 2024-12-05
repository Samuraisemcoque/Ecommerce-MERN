const paypal = require("../../helpers/paypal"); // Importa o módulo PayPal
const Order = require("../../models/Order"); // Importa o modelo Order
const Cart = require("../../models/Cart"); // Importa o modelo Cart
const Product = require("../../models/Product"); // Importa o modelo Product

// Função para criar um novo pedido
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body; // Obtém os dados do corpo da requisição

    // Cria o objeto de pagamento para o PayPal
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return", // URL de retorno
        cancel_url: "http://localhost:5173/shop/paypal-cancel", // URL de cancelamento
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    // Cria o pagamento no PayPal
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment", // Erro ao criar pagamento no PayPal
        });
      } else {
        // Cria um novo pedido com as informações fornecidas
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save(); // Salva o novo pedido no banco de dados

        // Obtém a URL de aprovação do pagamento do PayPal
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL, // Retorna a URL de aprovação do pagamento
          orderId: newlyCreatedOrder._id, // Retorna o ID do pedido recém-criado
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Algum erro ocorreu
    });
  }
};

// Função para capturar o pagamento do pedido
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body; // Obtém os dados do corpo da requisição

    let order = await Order.findById(orderId); // Busca o pedido pelo ID

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found", // Pedido não encontrado
      });
    }

    // Atualiza o status do pagamento e do pedido
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    // Atualiza o estoque dos produtos
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`, // Estoque insuficiente para o produto
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId); // Deleta o carrinho após o pedido ser confirmado

    await order.save(); // Salva as alterações no pedido

    res.status(200).json({
      success: true,
      message: "Order confirmed", // Pedido confirmado
      data: order, // Retorna os dados do pedido
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!", // Algum erro ocorreu
    });
  }
};

// Função para buscar todos os pedidos de um usuário específico
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }); // Busca todos os pedidos do usuário

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

// Função para buscar os detalhes de um pedido específico
const getOrderDetails = async (req, res) => {
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

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
}; // Exporta as funções para uso em outras partes da aplicação
