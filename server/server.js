const express = require("express"); // Importa o módulo Express
const mongoose = require("mongoose"); // Importa o módulo Mongoose para conectar ao MongoDB
const cookieParser = require("cookie-parser"); // Importa o módulo cookie-parser para lidar com cookies
const cors = require("cors"); // Importa o módulo CORS para permitir requisições de diferentes origens

// Importa os roteadores para várias funcionalidades da aplicação
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const reportRouter = require("./routes/admin/report-routes");
const { authMiddleware } = require("./controllers/auth/auth-controller");
const admin = require("./middleware/admin");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// Conecta ao MongoDB usando o Mongoose
mongoose
  .connect("mongodb+srv://joathan:joathan@cluster0.hqww3.mongodb.net/")
  .then(() => console.log("MongoDB connected")) // Log quando a conexão é bem-sucedida
  .catch((error) => console.log(error)); // Log do erro caso a conexão falhe

const app = express(); // Cria uma instância do Express
const PORT = process.env.PORT || 5000; // Define a porta em que o servidor irá rodar

// Configura o middleware CORS para permitir requisições de diferentes origens
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Permite envio de credenciais (cookies, cabeçalhos de autorização)
  })
);

app.use(cookieParser()); // Adiciona o middleware cookie-parser ao Express
app.use(express.json()); // Adiciona o middleware para parsear JSON ao Express

// Define as rotas da aplicação
app.use("/api/auth", authRouter); // Rotas de autenticação
app.use("/api/admin/products", adminProductsRouter); // Rotas de produtos para administrador
app.use("/api/admin/orders", adminOrderRouter); // Rotas de pedidos para administrador
app.use("/api/admin/reports", authMiddleware, admin, reportRouter); // Rotas de relatórios para administrador, com middleware de autenticação e verificação de administrador
app.use("/api/shop/products", shopProductsRouter); // Rotas de produtos para loja
app.use("/api/shop/cart", shopCartRouter); // Rotas de carrinho de compras para loja
app.use("/api/shop/address", shopAddressRouter); // Rotas de endereços para loja
app.use("/api/shop/order", shopOrderRouter); // Rotas de pedidos para loja
app.use("/api/shop/search", shopSearchRouter); // Rotas de busca de produtos para loja
app.use("/api/shop/review", shopReviewRouter); // Rotas de avaliações de produtos para loja
app.use("/api/common/feature", commonFeatureRouter); // Rotas comuns de funcionalidades

// Inicia o servidor na porta especificada
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`)); 
