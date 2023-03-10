import { createSlice } from "@reduxjs/toolkit";

interface DraggedElementsState {
  value: StateItem[];
}

interface StateItem {
  name: string;
  position: number;
}

const initialState: DraggedElementsState = {
  value: [],
};

export const draggedElementsSlice = createSlice({
  name: "draggedElements",
  initialState,
  reducers: {
    addNewElement(state, action) {
      const element = action.payload;
      const isExistInState = state.value.find((item) => item.name === element.name);
      if (!isExistInState) {
        let position;
        // Если элемент является инпутом и в массиве есть элементы, то сдвигаем их на +1 позицию и ставим инпут в начало
        if (element.name === "INPUT") {
          if (state.value.length) {
            for (let i = 0; i < state.value.length; i++) {
              state.value[i].position += 1;
            }
          }
          position = 1;
        } else {
          position = state.value.length + 1;
        }
        const el = { name: element.name, position };
        state.value.push(el);
      }
    },
    replaceElements(state, action) {
      // Этот редюсер срабатывает, когда происходит дроп элемента на другой элемент
      // Так как элементы из левого блока можно дропать на элементы из правого, то замена не нужна, потому что элемента ещё нет в массиве
      // Поэтому передаем этот элемент в addNewElement
      if (!state.value.find((el) => el.name === action.payload.name)) {
        addNewElement(action);
        return;
      }
      const currentElement = action.payload;
      const currentPosition = state.value.find((element) => element.name === currentElement.name)!.position;
      const elementToReplace = state.value.find((element) => element.position === currentElement.position);
      if(elementToReplace!.name === 'INPUT') {
        return
      }
      if (elementToReplace) {
        state.value.find((element) => element.position === currentElement.position)!.position = currentPosition;
        state.value.find((element) => element.name === currentElement.name)!.position = currentElement.position;
      }
    },
    removeBlock(state, action) {
      const { elementName, currentMode } = action.payload;
      if (currentMode === "Runtime") {
        return;
      }
      const positionOfDeleteElement = state.value.find((el) => el.name === elementName)!.position;
      state.value = state.value.filter((element) => element.name !== elementName);
      // Уменьшаем позиции элементов, следующих за удаленным
      for (let i = positionOfDeleteElement; i <= state.value.length; i++) {
        const elementIndex = state.value.findIndex((el) => el.position === i + 1);
        state.value[elementIndex].position -= 1;
      }
    },
  },
});

export const { addNewElement, replaceElements, removeBlock } = draggedElementsSlice.actions;
export default draggedElementsSlice.reducer;
