import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: "initialte",
    credential: "initialte",
    token: localStorage.getItem('token')? localStorage.getItem('token'):''
  },
  reducers: {
    // increment: state => {
    //   state.value += 1
    // },
    // decrement: state => {
    //   state.value -= 1
    // },
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user
      state.credential = action.payload.credential
      state.token = action.payload.user.token
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser } = loginSlice.actions

export default loginSlice.reducer
