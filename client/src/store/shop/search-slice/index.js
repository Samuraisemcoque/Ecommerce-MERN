import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importa as funções createAsyncThunk e createSlice da biblioteca "@reduxjs/toolkit"
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

const initialState = {
  isLoading: false,
  searchResults: [],
}; // Define o estado inicial do slice

// Define a thunk para obter os resultados da busca
export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/search/${keyword}`
    );

    return response.data;
  }
);

// Cria o slice de busca
const searchSlice = createSlice({
  name: "searchSlice", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    }, // Define o reducer para resetar os resultados da busca
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

// Exporta a ação resetSearchResults
export const { resetSearchResults } = searchSlice.actions;

// Exporta o reducer do slice de busca
export default searchSlice.reducer;
