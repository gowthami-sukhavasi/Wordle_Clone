import { ENTER, BACKSPACE, ROWS } from "../utils/constants";

const Keyboard = ({ onKeyClick, keyboardState }) => {
  return (
    <div className="keyboardSection">
      {ROWS.map((row, rowIndex) => (
        <div className="keyboardRow" key={rowIndex}>
          {row.map((key) => (
            <div
              className={`keyboardButton
              ${
                key === ENTER
                  ? "buttonEnter"
                  : key === BACKSPACE
                  ? "buttonBack"
                  : ""
              } 
          ${
            keyboardState[key]?.state != undefined
              ? keyboardState[key]?.state
              : ""
          }`}
              key={key}
              onClick={() => onKeyClick(key)}
            >
              {key === BACKSPACE ? (
                <span className="material-icons">backspace</span>
              ) : (
                key
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
