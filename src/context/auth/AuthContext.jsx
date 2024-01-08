import { createContext } from "react";
import { useEffect, useReducer } from "react";
import { initialize, reducer } from "./reducers.js";
import { getProfile } from "../../service/userService.js";

export const AuthActionType = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

export const PayloadAction = ({ type, payload }) => ({
  type,
  payload,
});

export const AuthContextType = ({ dispatch, ...AuthState }) => ({
  dispatch,
  ...AuthState,
});

const initialState = {
  isAuthenticated: false,
  isInitialize: false,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  dispatch: () => null,
});

// ... (other imports and constants)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");

      if (!accessToken) {
        console.log("state 1");
        return dispatch(initialize({ isAuthenticated: false, user: null }));
      }

      try {
        const user = await getProfile();
        console.log("state 2");
        if (user) {
          console.log("state 3");
          dispatch(initialize({ isAuthenticated: true, user }));
          sessionStorage.setItem("user", JSON.stringify(user));
        } else {
          console.log("state 4");
          dispatch(initialize({ isAuthenticated: false, user: null }));
        }
      } catch {
        console.log("state 5");
        dispatch(initialize({ isAuthenticated: false, user: null }));
      }
    };

    initializeAuth();
  }, [dispatch]); // No dependencies here to ensure it runs only once during component mount

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
