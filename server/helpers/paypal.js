const paypal = require("paypal-rest-sdk"); // Importa o SDK do PayPal

// Configura o SDK do PayPal com as credenciais da conta de sandbox
paypal.configure({
  mode: "sandbox", // Define o modo sandbox para testes
  client_id: "AT_Xs3bHErvuiv2w6WJoeBYhjUsOzUY10U4OCZ7IOThPfAFZWRFBLUKoZZ6zVKSheJNKUuJygXXvgTB0", // ID do cliente da aplicação PayPal
  client_secret: "EC5X-bc4xb4PJREyz42NmFUI7O4Frd9xLF6AQHHTyfx_2Kx2-HjnuwyD7uTI8q3VQqIRwKRjJZ8oWUDL", // Segredo do cliente da aplicação PayPal
});

module.exports = paypal; // Exporta a configuração do PayPal para uso em outras partes da aplicação
