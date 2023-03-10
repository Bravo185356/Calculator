import { createSlice } from "@reduxjs/toolkit";
import { calcValue } from "../../Utility/CalculateFunction";

const initialState = {
  value: "0",
  // Когда в строке выражения нету оператора needCalc == false
  needCalc: false,
  // Когда в инпуте результат выражения
  isCalculate: false,
};

const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    addToValue(state, action) {
      const newSymbol = action.payload;
      const possibleSymbols = /[0-9-+x=//]/;
      const isNumber = /[0-9]/
      const regExp = /[-+x//]/;

      if (!possibleSymbols.test(newSymbol)) {
        return;
      }
      if (state.isCalculate && isNumber.test(newSymbol)) {
        state.value = newSymbol;
        state.isCalculate = false;
        return;
      }
      // Проверяем какой элемент вводится при state.value === 0
      if (state.value === "0" && regExp.test(newSymbol)) {
        state.value += newSymbol;
        return;
      } else if (state.value === "0" && !regExp.test(newSymbol)) {
        state.value = newSymbol;
        return;
      }
      // Если последний введенный символ - оператор и текущий символ тоже является оператором, то меняем их
      if (regExp.test(state.value.slice(-1)) && newSymbol.match(regExp)) {
        state.value = state.value.slice(0, state.value.length - 1) + newSymbol;
        return;
      }
      // Если введенный символ - оператор и needCalc, то посчитать выражение, которое находится в строке
      // и к результату добавить новый оператоор
      if ((regExp.test(newSymbol) && state.needCalc === true) || newSymbol === "=") {
        const oper = state.value.match(regExp)![0];
        // нужно вытащить из массива оператор и поделить массив, таким образом сохранив оператор
        const [firstNumber, secondNumber] = state.value.replace(",", ".").split(oper);
        let calculatedValue = calcValue({ firstNumber, oper, secondNumber })!.toString();
        if (calculatedValue === "Infinity") {
          state.value = "Не определено";
          state.isCalculate = true;
          return;
        }
        // если число состоит больше чем из 11 символов, то округляем
        if (calculatedValue.toString().length > 11) {
          calculatedValue = Math.round(+calculatedValue).toString();
        } else {
          calculatedValue = calculatedValue.toString().replace(".", ",");
        }
        if (action.payload === "=") {
          state.value = calculatedValue;
          state.needCalc = false;
        } else {
          state.value = `${calculatedValue}${newSymbol}`;
        }
        state.isCalculate = true;
        // Введенный символ - оператор и needCalc === false, то меняем needCalc и добавляем оператор в выражение
      } else if (regExp.test(newSymbol) && state.needCalc === false) {
        state.needCalc = !state.needCalc;
        state.value += `${newSymbol}`;
        // Если обычное число, то добавляем его в выражение
      } else {
        state.value += newSymbol;
      }
      state.isCalculate = false;
    },
    resetDisplay(state) {
      state.value = "0";
    },
    removeSymbol(state) {
      state.value = state.value.slice(0, state.value.length - 1);
    },
  },
});

export const { addToValue, resetDisplay, removeSymbol } = calculateSlice.actions;
export default calculateSlice.reducer;
