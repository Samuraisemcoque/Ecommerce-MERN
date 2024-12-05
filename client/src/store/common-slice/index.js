import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importa as funções createAsyncThunk e createSlice da biblioteca "@reduxjs/toolkit"
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

const initialState = {
  isLoading: false,
  featureImageList: [],
}; // Define o estado inicial do slice

// Define a thunk para obter as imagens em destaque
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );

    return response.data;
  }
);

// Define a thunk para adicionar uma nova imagem em destaque
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

// Cria o slice comum
const commonSlice = createSlice({
  name: "commonSlice", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

// Exporta o reducer do slice comum
export default commonSlice.reducer;
