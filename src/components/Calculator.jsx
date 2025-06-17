import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [previousValue, setPreviousValue] = useState(null);

  const inputNumber = (num) => {
    if (waitingForNext) {
      setDisplay(num);
      setWaitingForNext(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNext(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;

      case "x":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0
          ? firstValue / secondValue
          : "Cannot devide by zero!";
    }
  };

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNext(true);
    }
  };

  const inputDecimal = (decimal) => {
    if (waitingForNext) {
      setDisplay(decimal);
      setWaitingForNext(false);
    } else {
      setDisplay(display + decimal);
    }
  };

  const clearScreen = () => {
    setDisplay("0");
    setWaitingForNext(false);
  };

  const formatDisplay = (value) => {
    if (value.length > 12) {
      return parseFloat(value).toExponential(6);
    }
    return display;
  };

  return (
    <>
      <div className="max-w-sm mx-auto mt-8 bg-gray-900 rounded-2xl shadow-2xl p-6">
        {/* Screen */}
        <div className="bg-black rounded-xl p-4 mb-4">
          <div className="text-white text-right text-3xl font-mono min-h-[48px] flex items-center justify-end overflow-hidden">
            {formatDisplay(display)}
          </div>
        </div>

        {/* calculator body */}
        <div className="grid grid-cols-4 gap-3">
          {/* first row */}
          <button
            onClick={clearScreen}
            className="col-span-2 bg-gray-600 hover:bg-gray-500 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            Clear
          </button>

          <button
            onClick={() => inputOperation("÷")}
            className="bg-orange-500 hover:bg-orange-400 text-xl text-white font-semibold py-4 rounded-xl transition-colors"
          >
            ÷
          </button>

          <button
            onClick={() => inputOperation("x")}
            className="bg-orange-500 hover:bg-orange-400 text-xl text-white font-semibold py-4 rounded-xl transition-colors"
          >
            x
          </button>

          {/* second row */}
          <button
            onClick={() => inputNumber("7")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            7
          </button>

          <button
            onClick={() => inputNumber("8")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            8
          </button>

          <button
            onClick={() => inputNumber("9")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            9
          </button>

          <button
            onClick={() => inputOperation("-")}
            className="bg-orange-500 hover:bg-orange-400 text-xl text-white font-semibold py-4 rounded-xl transition-colors"
          >
            -
          </button>

          {/* third row */}
          <button
            onClick={() => inputNumber("4")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            4
          </button>

          <button
            onClick={() => inputNumber("5")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            5
          </button>

          <button
            onClick={() => inputNumber("6")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            6
          </button>

          <button
            onClick={() => inputOperation("+")}
            className="bg-orange-500 hover:bg-orange-400 text-xl text-white font-semibold py-4 rounded-xl transition-colors"
          >
            +
          </button>

          {/* fourth row */}
          <button
            onClick={() => inputNumber("1")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            1
          </button>

          <button
            onClick={() => inputNumber("2")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            2
          </button>

          <button
            onClick={() => inputNumber("3")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            3
          </button>

          <button
            onClick={performCalculation}
            className="row-span-2 bg-orange-500 hover:bg-orange-400 text-xl text-white font-semibold py-4 rounded-xl transition-colors"
          >
            =
          </button>

          {/* fourth row */}
          <button
            onClick={() => inputNumber("0")}
            className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            0
          </button>

          <button
            onClick={() => inputDecimal(".")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-colors"
          >
            .
          </button>
        </div>
      </div>
    </>
  );
}
