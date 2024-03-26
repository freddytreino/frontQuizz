import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import snackbarReducer from './snackbarSlice'

export default configureStore({
    reducer: {
      auth: authReducer,
      snackbar: snackbarReducer 
    },
  })