import { configureStore } from "@reduxjs/toolkit";
import draggedElementsSlice from "./DraggedElements/DraggedElementsSlice";
import currentModeSlice from "./CurrentMode/CurrentMode";
import CalculateSlice from "./Calculate/CalculateSlice";
import isDraggingSlice from "./isDragging/isDraggingSlice";
export const store = configureStore({
  reducer: {
    draggedElementsSlice,
    currentModeSlice,
    CalculateSlice,
    isDraggingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
