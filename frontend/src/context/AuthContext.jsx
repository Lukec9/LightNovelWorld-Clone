import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import axios from "axios"; // Use axios for API requests
import axiosInstance from "../axios";

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
        loading: false,
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
    const fetchUser = async () => {
      try {
        dispatch({ type: SET_LOADING });
        const response = await axiosInstance.get("/users/me");
        if (response.data) {
          dispatch({ type: LOGIN, payload: response.data });
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch({ type: LOGOUT });
      } finally {
        dispatch({ type: "STOP_LOADING" });
      }
    };

    fetchUser();
  }, []);

  const login = userData => {
    try {
      dispatch({ type: SET_LOADING });
      dispatch({ type: LOGIN, payload: userData });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: SET_LOADING });
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  const contextValue = useMemo(
    () => ({
      state,
      login,
      logout,
      dispatch,
    }),
    [state, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
