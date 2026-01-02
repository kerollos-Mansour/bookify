import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isSearchOpen: boolean;
  activeCurrency: string;
}
const initialState: AppState = {
  isSearchOpen: false,
  activeCurrency: "USD",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.activeCurrency = action.payload;
    },
  },
});

export const { toggleSearch, setCurrency } = appSlice.actions;
export default appSlice.reducer;
