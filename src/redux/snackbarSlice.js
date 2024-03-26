import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    isActive: false,
    variant: "info",
    title: null,
    message: null,
  },
  reducers: {
    showSnackbar: (state, actions) => {
      const { payload } = actions;
      state.variant = payload.variant;
      state.title = payload.title || null;
      state.message = payload.message || null;
      state.isActive = true;
    },

    hideSnackbar: (state) => {
      state.isActive = false;
      state.variant = null;
      state.title = null;
      state.message = null;
    },
  },
});


export const {showSnackbar, hideSnackbar} = snackbarSlice.actions

export default snackbarSlice.reducer