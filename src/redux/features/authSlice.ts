import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  token: string;
  isLogin: boolean;
  user: { [key: string]: string };
}

const initialState: IState = {
  token: "",
  isLogin: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.token = payload.token;
      state.isLogin = Boolean(payload.token);
      state.user = payload.user;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setAuth, setUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
