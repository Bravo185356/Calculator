import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const isDraggingSlice = createSlice({
  name: "isDragging",
  initialState,
  reducers: {
    toggleIsDragging(state) {
      state.value = !state.value;
    },
  },
});

export const { toggleIsDragging } = isDraggingSlice.actions;
export default isDraggingSlice.reducer;
