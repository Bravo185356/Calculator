import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToValue } from "../../store/Calculate/CalculateSlice";
import { toggleIsDragging } from "../../store/isDragging/isDraggingSlice";
import "./CalculateButton.scss";

export default function CalculateButton({ rightSide = false }) {
  const elements = useAppSelector((state) => state.draggedElementsSlice.value);
  const currentMode = useAppSelector((state) => state.currentModeSlice.value);

  const dispatch = useAppDispatch();

  const [isDraggable, setIsDraggable] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const rootClasses = ["block-wrapper"];
  if (currentMode === "Runtime") {
    rootClasses.push("wrapper-hidden");
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CALC_BUTTON",
      canDrag: isDraggable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        itemType: monitor.getItemType(),
      }),
    }),
    [currentMode, elements, isDraggable]
  );

  useEffect(() => {
    dispatch(toggleIsDragging());
  }, [isDragging, dispatch]);

  useEffect(() => {
    if (rightSide === false && elements.find((element) => element.name === "CALC_BUTTON")) {
      setIsDraggable(false);
      setOpacity(0.5);
    } else if (currentMode !== "Constructor") {
      setIsDraggable(false);
      setOpacity(1);
    } else if (
      (rightSide === false && !elements.find((element) => element.name === "CALC_BUTTON")) ||
      (rightSide && currentMode === "Constructor")
    ) {
      setIsDraggable(true);
      setOpacity(1);
    }
  }, [rightSide, currentMode, elements]);

  return (
    <div
      ref={drag}
      className={rootClasses.join(" ")}
      style={{
        cursor: isDraggable ? "move" : "auto",
        opacity: isDragging ? 0.5 : opacity,
      }}
    >
      {currentMode === "Constructor" && <div className="wrap"></div>}
      <button ref={drag} onClick={() => dispatch(addToValue("="))} className="calc-btn">
        =
      </button>
    </div>
  );
}
