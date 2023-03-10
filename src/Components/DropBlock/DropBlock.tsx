import { useDrop } from "react-dnd";
import { draggableItems } from "../../draggableItems";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { removeBlock, replaceElements } from "../../store/DraggedElements/DraggedElementsSlice";
import CalculateButton from "../CalculateButton/CalculateButton";
import Input from "../Input/Input";
import NumbersBlock from "../NumbersBlock/NumbersBlock";
import OperationBlock from "../OperationBlock/OperationBlock";
import "./DropBlock.scss";

interface DropBlockProps {
  placeIndex: number;
}

export default function DropBlock({ placeIndex }: DropBlockProps) {
  const currentMode = useAppSelector((state) => state.currentModeSlice.value);
  const elements = useAppSelector((state) => state.draggedElementsSlice.value);
  
  const dispatch = useAppDispatch();

  const [, drop] = useDrop(() => ({
    accept: [...draggableItems],
    drop: (item, monitor) => {
      dispatch(replaceElements({ name: monitor.getItemType(), position: placeIndex }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="drop-place">
      {elements.map((el) => {
        if (placeIndex === el.position) {
          return (
            <div key={el.name} onDoubleClick={() => dispatch(removeBlock({ elementName: el.name, currentMode }))}>
              {el.name === "CALC_BUTTON" && <CalculateButton rightSide={true} />}
              {el.name === "NUMBERS_BLOCK" && <NumbersBlock rightSide={true} />}
              {el.name === "INPUT" && <Input rightSide={true} />}
              {el.name === "OPERATION_BLOCK" && <OperationBlock rightSide={true} />}
            </div>
          );
        }
      })}
    </div>
  );
}
