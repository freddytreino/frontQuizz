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
     
      if (payload && payload.email) {
        state.user = {
          ...payload,
          pontuacao: payload.pontuacao !== undefined ? payload.pontuacao : state.user.pontuacao,
          respondido: payload.respondido !== undefined ? payload.respondido : state.user.respondido,
        };
        localStorage.setItem('loggedUser', JSON.stringify(state.user));
        state.isAuthenticated = true;
        
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
