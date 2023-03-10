import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleIsDragging } from "../../store/isDragging/isDraggingSlice";
import ButtonWhite from "../../UI/ButtonWhite/ButtonWhite";
import "./OperationBlock.scss";

export default function OperationBlock({ rightSide = false }) {
  const elements = useAppSelector((state) => state.draggedElementsSlice.value);
  const currentMode = useAppSelector((state) => state.currentModeSlice.value);

  const dispatch = useAppDispatch();

  const [isDraggable, setIsDraggable] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const rootClasses = ["operation-block", "block-wrapper"];
  if (currentMode === "Runtime") {
    rootClasses.push("wrapper-hidden");
  }

  const buttons = ["/", "x", "-", "+"];

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "OPERATION_BLOCK",
      canDrag: isDraggable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag(),
        itemType: monitor.getItemType(),
      }),
    }),
    [elements, currentMode, isDraggable]
  );

  useEffect(() => {
    dispatch(toggleIsDragging());
  }, [isDragging, dispatch]);

  useEffect(() => {
    if (rightSide === false && elements.find((element) => element.name === "OPERATION_BLOCK")) {
      setIsDraggable(false);
      setOpacity(0.5);
    } else if (currentMode !== "Constructor") {
      setIsDraggable(false);
      setOpacity(1);
    } else if (
      (rightSide === false && !elements.find((element) => element.name === "OPERATION_BLOCK")) ||
      (rightSide && currentMode === "Constructor")
    ) {
      setIsDraggable(true);
      setOpacity(1);
    }
  }, [rightSide, currentMode, elements]);
  return (
    <div
      ref={drag}
      style={{
        cursor: isDraggable ? "move" : "auto",
        opacity: isDragging ? 0.5 : opacity,
      }}
      className={rootClasses.join(" ")}
    >
      {currentMode === "Constructor" && <div className="wrap"></div>}
      {buttons.map((button) => {
        return <ButtonWhite key={button} text={button} />;
      })}
    </div>
  );
}
