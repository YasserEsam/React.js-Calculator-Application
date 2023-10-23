import React, { useReducer } from "react";

const initialState = {
  previousOperand: "",
  currentOperand: "",
  operator: "",
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case "DIGIT":
      return {
        ...state,
        currentOperand: state.currentOperand + action.value,
      };
    case "OPERATOR":
      return {
        previousOperand: state.currentOperand,
        currentOperand: "",
        operator: action.value,
      };
    case "CLEAR":
      return initialState;
    case "DELETE":
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case "EQUALS":
      try {
        const result = eval(state.previousOperand + state.operator + state.currentOperand);
        return {
          previousOperand: "",
          currentOperand: result.toString(),
          operator: "",
        };
      } catch (error) {
        return {
          ...state,
          currentOperand: "Error",
        };
      }
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleButtonClick = (value) => {
    if (!isNaN(value)) {
      dispatch({ type: "DIGIT", value });
    } else if (value === "=") {
      dispatch({ type: "EQUALS" });
    } else if (value === "AC") {
      dispatch({ type: "CLEAR" });
    } else if (value === "DEL") {
      dispatch({ type: "DELETE" });
    } else {
      dispatch({ type: "OPERATOR", value });
    }
  };

  return (
    <div className="calculater-grid">
      <div className="output">
        <div className="previous-operand">{state.previousOperand}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => handleButtonClick("AC")}>
        AC
      </button>
      <button onClick={() => handleButtonClick("DEL")}>DEL</button>
      <button onClick={() => handleButtonClick("%")}>%</button>
      <button onClick={() => handleButtonClick("1")}>1</button>
      <button onClick={() => handleButtonClick("2")}>2</button>
      <button onClick={() => handleButtonClick("3")}>3</button>
      <button onClick={() => handleButtonClick("*")}>*</button>
      <button onClick={() => handleButtonClick("4")}>4</button>
      <button onClick={() => handleButtonClick("5")}>5</button>
      <button onClick={() => handleButtonClick("6")}>6</button>
      <button onClick={() => handleButtonClick("+")}>+</button>
      <button onClick={() => handleButtonClick("7")}>7</button>
      <button onClick={() => handleButtonClick("8")}>8</button>
      <button onClick={() => handleButtonClick("9")}>9</button>
      <button onClick={() => handleButtonClick("-")}>-</button>
      <button onClick={() => handleButtonClick(".")}>.</button>
      <button onClick={() => handleButtonClick("0")}>0</button>
      <button className="span-two" onClick={() => handleButtonClick("=")}>
        =
      </button>
    </div>
  );
};

export default App;
