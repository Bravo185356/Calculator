import "./ButtonWhite.scss";
import { addToValue } from "../../store/Calculate/CalculateSlice";
import { useAppDispatch } from "../../hooks/hooks";

interface ButtonWhiteProps {
  text: string | number;
}

export default function ButtonWhite({ text }: ButtonWhiteProps) {
  const dispatch = useAppDispatch()
  const buttonClasses = ['button_white']
  if(text === '0') {
    buttonClasses.push('long')
  }
  return <button className={buttonClasses.join(' ')} onClick={() => dispatch(addToValue(text))}>{text}</button>;
}
