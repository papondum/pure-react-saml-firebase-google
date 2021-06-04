import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/login'

export default configureStore({
  reducer: {
    login: loginReducer
  }
})
