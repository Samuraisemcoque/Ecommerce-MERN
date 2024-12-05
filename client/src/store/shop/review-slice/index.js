import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importa as funções createAsyncThunk e createSlice da biblioteca "@reduxjs/toolkit"
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

const initialState = {
  isLoading: false,
  reviews: [],
}; // Define o estado inicial do slice

// Define a thunk para adicionar uma nova avaliação
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/review/add`,
      formdata
    );

    return response.data;
  }
);

// Define a thunk para obter as avaliações de um produto específico
export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/shop/review/${id}`
  );

  return response.data;
});

// Cria o slice de avaliações
const reviewSlice = createSlice({
  name: "reviewSlice", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

// Exporta o reducer do slice de avaliações
export default reviewSlice.reducer;
