import "./App.scss";
import CalculateButton from "./Components/CalculateButton/CalculateButton";
import Input from "./Components/Input/Input";
import NumbersBlock from "./Components/NumbersBlock/NumbersBlock";
import OperationBlock from "./Components/OperationBlock/OperationBlock";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { changeMode } from "./store/CurrentMode/CurrentMode";
import DropField from "./Components/DropField/DropField";
import EyeIcon from "./icons/IconComponent/EyeIcon";
import SelectorIcon from "./icons/IconComponent/SelectorIcon";
import { useEffect } from "react";
import { resetDisplay } from "./store/Calculate/CalculateSlice";

function App() {
  const elementsLength = useAppSelector((state) => state.draggedElementsSlice.value).length;
  const currentMode = useAppSelector((state) => state.currentModeSlice.value);

  const dispatch = useAppDispatch();

  const blocksClasses = ["blocks"];
  if (elementsLength !== 0) {
    blocksClasses.push("end");
  }

  const runtimeBtnClasses = ["mode-btn"];
  const constructorBtnClasses = ["mode-btn"];
  if (currentMode === "Runtime") {
    runtimeBtnClasses.push("active");
  } else {
    constructorBtnClasses.push("active");
  }

  useEffect(() => {
    dispatch(resetDisplay());
  }, [currentMode, dispatch]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="wrapper">
          <div className="mode-buttons-wrapper">
            <div className="mode-buttons">
              <div onClick={() => dispatch(changeMode("Runtime"))} className={runtimeBtnClasses.join(" ")}>
                <EyeIcon color={currentMode === "Runtime" ? "#5D5FEF" : "#4D5562"} />
                <div>Runtime</div>
              </div>
              <div onClick={() => dispatch(changeMode("Constructor"))} className={constructorBtnClasses.join(" ")}>
                <SelectorIcon color={currentMode === "Constructor" ? "#5D5FEF" : "#4D5562"} />
                <div>Constructor</div>
              </div>
            </div>
          </div>
          <div className={blocksClasses.join(" ")}>
            {((!elementsLength && currentMode === "Runtime") || currentMode === "Constructor") && (
              <div className="main-block">
                <Input />
                <OperationBlock />
                <NumbersBlock />
                <CalculateButton />
              </div>
            )}
            {((elementsLength !== 0 && currentMode === "Runtime") || currentMode === "Constructor") && <DropField />}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
