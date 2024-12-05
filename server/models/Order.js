const mongoose = require("mongoose"); // Importa o módulo mongoose

// Define o esquema para o modelo Order
const OrderSchema = new mongoose.Schema({
  userId: String, // ID do usuário que fez o pedido
  cartId: String, // ID do carrinho associado ao pedido
  cartItems: [
    {
      productId: String, // ID do produto no carrinho
      title: String, // Título do produto
      image: String, // URL da imagem do produto
      price: String, // Preço do produto
      quantity: Number, // Quantidade do produto
    },
  ],
  addressInfo: {
    addressId: String, // ID do endereço de entrega
    address: String, // Endereço de entrega
    city: String, // Cidade de entrega
    pincode: String, // Código postal de entrega
    phone: String, // Telefone de contato
    notes: String, // Notas adicionais sobre a entrega
  },
  orderStatus: String, // Status do pedido (por exemplo, "pendente", "confirmado", "entregue")
  paymentMethod: String, // Método de pagamento utilizado
  paymentStatus: String, // Status do pagamento (por exemplo, "pendente", "pago")
  totalAmount: Number, // Valor total do pedido
  orderDate: Date, // Data em que o pedido foi feito
  orderUpdateDate: Date, // Data da última atualização do pedido
  paymentId: String, // ID do pagamento
  payerId: String, // ID do pagador (por exemplo, no PayPal)
});

module.exports = mongoose.model("Order", OrderSchema); // Exporta o modelo Order baseado no OrderSchema
