import { useTheme } from "../context/ThemeContext";

const ColorPicker = () => {
  const { bgColor, changeBgColor, highlightColor, changeHighlightColor } =
    useTheme();

  return (
    <div>
      <div className="color-select">
        <h4>Dark Mode Background Colors</h4>
        <div className="color-list">
          {[
            "black",
            "gray",
            "darkgray",
            "darkblue",
            "darkblue2",
            "darkblue3",
            "darkblue4",
            "darkblue5",
            "darkgreen",
            "darkbrown",
            "darkpurple",
            "darkyellow",
          ].map(color => (
            <div className="color-item" key={color}>
              <input
                id={`bgcolor-${color}`}
                name="bgcolor"
                type="radio"
                value={color}
                checked={bgColor === color}
                onChange={() => changeBgColor(color)}
              />
              <label htmlFor={`bgcolor-${color}`} data-bgcolor={color} />
            </div>
          ))}
        </div>
      </div>

      <div className="color-select">
        <h4>Highlight Colors</h4>
        <div className="color-list">
          {[
            "gray",
            "purple",
            "darkpurple",
            "grayblue",
            "blue",
            "blue2",
            "green",
            "green2",
            "yellow",
            "red",
            "orange",
            "pink",
          ].map(color => (
            <div className="color-item" key={color}>
              <input
                id={`hgcolor-${color}`}
                name="hgcolor"
                type="radio"
                value={color}
                checked={highlightColor === color}
                onChange={() => changeHighlightColor(color)}
              />
              <label htmlFor={`hgcolor-${color}`} data-hgcolor={color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
