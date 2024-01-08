import AuthState from "./types";

const AuthActionType = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return { ...state, isAuthenticated, isInitialized: true, user };
  },
  SIGN_IN: (state, action) => {
    const { user } = action.payload;
    return { ...state, isAuthenticated: true, user };
  },
  SIGN_OUT: (state) => {
    return { ...state, isAuthenticated: false, user: null };
  },
};

export const reducer = (state = AuthState, action = {}) => {
  if (!reducerHandlers[action.type]) {
    console.warn(`Unhandled action type: ${action.type}`);
    return state;
  }
  return reducerHandlers[action.type](state, action);
};

export const initialize = (payload) => ({
  type: AuthActionType.INITIALIZE,
  payload,
});

export const signIn = (payload) => ({ type: AuthActionType.SIGN_IN, payload });

export const signOut = () => ({
  type: AuthActionType.SIGN_OUT,
  payload: { user: null },
});
