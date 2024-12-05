import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importa as funções createAsyncThunk e createSlice da biblioteca "@reduxjs/toolkit"
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
}; // Define o estado inicial do slice

// Define a thunk para buscar todos os produtos filtrados
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    console.log(result);

    return result?.data;
  }
);

// Define a thunk para buscar os detalhes de um produto específico
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

// Cria o slice de produtos de compras
const shoppingProductSlice = createSlice({
  name: "shoppingProducts", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    }, // Define o reducer para resetar os detalhes do produto
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

// Exporta a ação setProductDetails
export const { setProductDetails } = shoppingProductSlice.actions;

// Exporta o reducer do slice de produtos de compras
export default shoppingProductSlice.reducer;
