import { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToValue, removeSymbol } from "../../store/Calculate/CalculateSlice";
import { toggleIsDragging } from "../../store/isDragging/isDraggingSlice";
import "./Input.scss";

export default function Input({ rightSide = false }) {
  const currentMode = useAppSelector((state) => state.currentModeSlice.value);
  const elements = useAppSelector((state) => state.draggedElementsSlice.value);
  const displayValue = useAppSelector((state) => state.CalculateSlice.value);

  const input = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

  const [isDraggable, setIsDraggable] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const rootClasses = ["block-wrapper"];
  if (currentMode === "Runtime") {
    rootClasses.push("wrapper-hidden");
  }

  function changeDispayValue(value: string) {
    if(value.length < displayValue.length) {
      dispatch(removeSymbol())
    } else {
      dispatch(addToValue(value.slice(-1)))
    }
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "INPUT",
      canDrag: rightSide ? false : isDraggable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        itemType: monitor.getItemType(),
      }),
    }),
    [currentMode, elements, isDraggable]
  );

  useEffect(() => {
    if (rightSide === false && elements.find((element) => element.name === "INPUT")) {
      setIsDraggable(false);
      setOpacity(0.5);
    } else if (currentMode !== "Constructor" || rightSide) {
      setIsDraggable(false);
      setOpacity(1);
    } else if (
      (rightSide === false && !elements.find((element) => element.name === "INPUT")) ||
      (rightSide && currentMode === "Constructor")
    ) {
      setIsDraggable(true);
      setOpacity(1);
    }
  }, [rightSide, currentMode, elements]);

  useEffect(() => {
    dispatch(toggleIsDragging());
  }, [isDragging, dispatch]);

  return (
    <div
      ref={drag}
      style={{
        cursor: isDraggable ? "move" : "no-drop",
        opacity: isDragging ? 0.5 : opacity,
      }}
      className={rootClasses.join(" ")}
    >
      {currentMode === "Constructor" && <div className="wrap"></div>}
      <input ref={input} onClick={() => input.current!.selectionStart = input.current!.value.length} className="input" onChange={(e) => changeDispayValue(e.target.value)} value={displayValue} />
    </div>
  );
}
