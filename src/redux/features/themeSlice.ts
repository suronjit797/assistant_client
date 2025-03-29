/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FullScreenHandle } from "react-full-screen";

// Define the state type
interface ThemeState {
  isDark: boolean;
  isFullScreen: boolean;
  isNavOpen: boolean;
  fullScreenHandle: any | null;
}

// Initial state
const initialState: ThemeState = {
  isDark: false,
  isFullScreen: false,
  isNavOpen: true,
  fullScreenHandle: null,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, { payload }: PayloadAction<boolean | undefined>) => {
      state.isDark = payload !== undefined ? payload : !state.isDark;
    },
    changeFullScreen: (state, { payload }: PayloadAction<boolean>) => {
      state.isFullScreen = payload;
    },
    changeNavOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isNavOpen = payload;
    },
    setFullScreenHandle: (state, { payload }: PayloadAction<FullScreenHandle>) => {
      state.fullScreenHandle = payload ; 
    },
  },
});

// Export actions
export const { changeTheme, changeFullScreen, changeNavOpen, setFullScreenHandle } = themeSlice.actions;

// Export reducer (corrected)
export default themeSlice.reducer;
