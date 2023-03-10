import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentModeState {
  value: string;
}

const initialState: CurrentModeState = {
  value: "Runtime",
};

export const currentModeSlice = createSlice({
  name: "currentMode",
  initialState,
  reducers: {
    changeMode(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});
export const { changeMode } = currentModeSlice.actions;
export default currentModeSlice.reducer;
