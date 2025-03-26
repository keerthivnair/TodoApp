import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      if (username === "user" && password === "password") {
        state.isAuthenticated = true;
        state.username = username;
      } else {
        alert("Invalid username or password");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.password = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
