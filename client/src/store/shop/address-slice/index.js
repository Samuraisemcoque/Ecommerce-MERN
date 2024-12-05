import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importa as funções createAsyncThunk e createSlice da biblioteca "@reduxjs/toolkit"
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

const initialState = {
  isLoading: false,
  addressList: [],
}; // Define o estado inicial do slice

// Define a thunk para adicionar um novo endereço
export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/address/add",
      formData
    );

    return response.data;
  }
);

// Define a thunk para buscar todos os endereços
export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/address/get/${userId}`
    );

    return response.data;
  }
);

// Define a thunk para editar um endereço específico
export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

// Define a thunk para deletar um endereço específico
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

// Cria o slice de endereços
const addressSlice = createSlice({
  name: "address", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

// Exporta o reducer do slice de endereços
export default addressSlice.reducer;
