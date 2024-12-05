import { configureStore } from "@reduxjs/toolkit"; // Importa a função configureStore da biblioteca "@reduxjs/toolkit"
import authReducer from "./auth-slice"; // Importa o reducer de autenticação
import adminProductsSlice from "./admin/products-slice"; // Importa o slice de produtos do administrador
import adminOrderSlice from "./admin/order-slice"; // Importa o slice de pedidos do administrador

import shopProductsSlice from "./shop/products-slice"; // Importa o slice de produtos da loja
import shopCartSlice from "./shop/cart-slice"; // Importa o slice de carrinho de compras da loja
import shopAddressSlice from "./shop/address-slice"; // Importa o slice de endereços da loja
import shopOrderSlice from "./shop/order-slice"; // Importa o slice de pedidos da loja
import shopSearchSlice from "./shop/search-slice"; // Importa o slice de busca da loja
import shopReviewSlice from "./shop/review-slice"; // Importa o slice de avaliações da loja
import commonFeatureSlice from "./common-slice"; // Importa o slice de recursos comuns

const store = configureStore({
  reducer: {
    auth: authReducer, // Adiciona o reducer de autenticação

    adminProducts: adminProductsSlice, // Adiciona o slice de produtos do administrador
    adminOrder: adminOrderSlice, // Adiciona o slice de pedidos do administrador

    shopProducts: shopProductsSlice, // Adiciona o slice de produtos da loja
    shopCart: shopCartSlice, // Adiciona o slice de carrinho de compras da loja
    shopAddress: shopAddressSlice, // Adiciona o slice de endereços da loja
    shopOrder: shopOrderSlice, // Adiciona o slice de pedidos da loja
    shopSearch: shopSearchSlice, // Adiciona o slice de busca da loja
    shopReview: shopReviewSlice, // Adiciona o slice de avaliações da loja

    commonFeature: commonFeatureSlice, // Adiciona o slice de recursos comuns
  },
});

export default store; // Exporta a store configurada
