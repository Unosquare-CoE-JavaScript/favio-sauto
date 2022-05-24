import { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [isRed, setIsRed] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <button
        style={{
          backgroundColor: isChecked
            ? "gray"
            : isRed
            ? "mediumvioletred"
            : "midnightblue",
        }}
        onClick={() => {
          setIsRed(!isRed);
        }}
        disabled={isChecked}
      >
        Change to {isRed ? "midnightblue" : "mediumvioletred"}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={isChecked}
        aria-checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
        }}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
