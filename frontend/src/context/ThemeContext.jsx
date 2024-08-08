import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Cookies.get("theme") || "dark");
  const [bgColor, setBgColor] = useState(Cookies.get("bgcolor") || "darkblue");
  const [highlightColor, setHighlightColor] = useState(
    Cookies.get("hgcolor") || "blue"
  );

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
    document.documentElement.setAttribute("bgcolor", bgColor);
    document.documentElement.setAttribute("hgcolor", highlightColor);

    Cookies.set("theme", theme, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("bgcolor", bgColor, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("hgcolor", highlightColor, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  }, [theme, bgColor, highlightColor]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const changeBgColor = color => {
    setBgColor(color);
  };

  const changeHighlightColor = color => {
    setHighlightColor(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        bgColor,
        changeBgColor,
        highlightColor,
        changeHighlightColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
