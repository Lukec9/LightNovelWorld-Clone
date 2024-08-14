import { createContext, useContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  loading: true,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_LOADING = "SET_LOADING";
const UPDATE_USER = "UPDATE_USER";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: SET_LOADING });
    const userFromCookies = Cookies.get("user");
    if (userFromCookies) {
      dispatch({ type: LOGIN, payload: JSON.parse(userFromCookies) });
    }
    dispatch({ type: "STOP_LOADING" });
  }, []);

  const login = userData => {
    dispatch({ type: LOGIN, payload: userData });
    Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Expires in 7 days
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
