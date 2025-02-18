import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name : "Theme",
  initialState : {
    isBlackTheme : true,
  },
  reducers : {
    toggleTheme : (state )=>{
        state.isBlackTheme = !state.isBlackTheme 
    }
  }
})

export const {toggleTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;
