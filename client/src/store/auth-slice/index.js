import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importa as funções createAsyncThunk e createSlice da biblioteca "@reduxjs/toolkit"
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
}; // Define o estado inicial do slice

// Define a thunk para registrar um novo usuário
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true, // Inclui cookies na requisição
      }
    );

    return response.data;
  }
);

// Define a thunk para fazer login de um usuário
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      {
        withCredentials: true, // Inclui cookies na requisição
      }
    );

    return response.data;
  }
);

// Define a thunk para fazer logout de um usuário
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true, // Inclui cookies na requisição
      }
    );

    return response.data;
  }
);

// Define a thunk para verificar a autenticação do usuário
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true, // Inclui cookies na requisição
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate", // Cabeçalhos para evitar cache
        },
      }
    );

    return response.data;
  }
);

// Cria o slice de autenticação
const authSlice = createSlice({
  name: "auth", // Nome do slice
  initialState, // Estado inicial do slice
  reducers: {
    setUser: (state, action) => {}, // Reducer vazio para setar o usuário (pode ser preenchido conforme necessário)
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Exporta a ação setUser
export const { setUser } = authSlice.actions;

// Exporta o reducer do slice de autenticação
export default authSlice.reducer;
