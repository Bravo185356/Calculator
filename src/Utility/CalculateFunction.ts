interface CalculateProps {
  firstNumber: string;
  oper: string;
  secondNumber: string;
}

export function calcValue({ firstNumber, oper, secondNumber }: CalculateProps) {
  switch (oper) {
    case "x":
      return +firstNumber * +secondNumber;
    case "/":
      return +firstNumber / +secondNumber;
    case "+":
      return +firstNumber + +secondNumber;
    case "-":
      return +firstNumber - +secondNumber;
  }
}
