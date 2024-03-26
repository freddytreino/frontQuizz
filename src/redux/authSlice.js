import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      nome: null,
      email: null,
      token: null,
      pontuacao: null,
      respondido: null,
      usuario: null
    },
    isAuthenticated: false
  },
  reducers: {
    login: (state, action) => {
      const { payload } = action;
      console.log("Dados recebidos do servidor:", payload); // Debugging
      if (payload && payload.email) {
        state.user = {
          ...payload, // Copiar todos os campos do payload
          pontuacao: payload.pontuacao !== undefined ? payload.pontuacao : state.user.pontuacao, // Preservar a pontuação atual se não estiver definida no payload
          respondido: payload.respondido !== undefined ? payload.respondido : state.user.respondido,
        };
        localStorage.setItem('loggedUser', JSON.stringify(state.user));
        state.isAuthenticated = true;
        console.log("Dados de usuário após o login:", state.user); // Debugging
      }
    },
    logout: (state) => {
      localStorage.removeItem('loggedUser');
      state.user = {
        nome: null,
        email: null,
        token: null,
        pontuacao: null,
        respondido: null,
        usuario: null
      };
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
