import { useDrop } from "react-dnd";
import { draggableItems } from "../../draggableItems";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addNewElement } from "../../store/DraggedElements/DraggedElementsSlice";
import DropBlock from "../DropBlock/DropBlock";
import "./DropField.scss";
import DropHereIcon from "../../icons/IconComponent/DropHereIcon";
import { useEffect, useState } from "react";

export default function DropField() {
  const [isLight, setIsLight] = useState(false)
  const isDragging = useAppSelector(state => state.isDraggingSlice.value)
  const elementsNumber = useAppSelector((state) => state.draggedElementsSlice.value).length;
  const dispatch = useAppDispatch();

  const constructorBlockClasses = ["constructor-block"];
  if(elementsNumber === 0 && isLight) {
    constructorBlockClasses.push('light')
  }
  if (elementsNumber !== 0) {
    constructorBlockClasses.push("non-empty");
  }

  const [, drop] = useDrop(() => ({
    accept: [...draggableItems],
    drop: (item, monitor) => {
      dispatch(addNewElement({ name: monitor.getItemType() }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [elementsNumber]);

  useEffect(() => {
    if(isDragging) {
      setIsLight(true)
    } else {
      setIsLight(false)
    }
  }, [isDragging])
  
  return (
    <div ref={drop} className={constructorBlockClasses.join(" ")}>
      {elementsNumber === 0 ? (
        <div className="drop-here-text">
          <DropHereIcon />
          <span className="drop-here-text_blue">Перетащите сюда</span>любой элемент из левой панели
        </div>
      ) : (
        [1, 2, 3, 4].map((item) => {
          return <DropBlock key={item} placeIndex={item} />;
        })
      )}
      
    </div>
  );
}
