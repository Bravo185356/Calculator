import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleIsDragging } from "../../store/isDragging/isDraggingSlice";
import ButtonWhite from "../../UI/ButtonWhite/ButtonWhite";
import "./NumbersBlock.scss";

export default function NumbersBlock({ rightSide = false }) {
  const elements = useAppSelector((state) => state.draggedElementsSlice.value);
  const currentMode = useAppSelector((state) => state.currentModeSlice.value);

  const dispatch = useAppDispatch();

  const buttons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];

  const [isDraggable, setIsDraggable] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const rootClasses = ["numbers-block", "block-wrapper"];
  if (currentMode === "Runtime") {
    rootClasses.push("wrapper-hidden");
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "NUMBERS_BLOCK",
      canDrag: isDraggable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [currentMode, elements, isDraggable]
  );
  useEffect(() => {
    if (rightSide === false && elements.find((element) => element.name === "NUMBERS_BLOCK")) {
      setIsDraggable(false);
      setOpacity(0.5);
    } else if (currentMode !== "Constructor") {
      setIsDraggable(false);
      setOpacity(1);
    } else if (
      (rightSide === false && !elements.find((element) => element.name === "NUMBERS_BLOCK")) ||
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
      className={rootClasses.join(" ")}
      style={{
        cursor: isDraggable ? "move" : "auto",
        opacity: isDragging ? 0.5 : opacity,
      }}
    >
      {currentMode === "Constructor" && <div className="wrap"></div>}
      {buttons.map((button) => {
        return <ButtonWhite key={button} text={button} />;
      })}
    </div>
  );
}
