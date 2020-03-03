import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED
} from "../actions";

const initialState = {
  id: "",
  email: "",
  loginErr: null,
  loginSuccess: null,
  regSuccess: null,
  regErr: null,
  isLoggedIn: false,
  isLoggedInErr: null
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        loginErr: null,
        loginSuccess: null
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginErr: null,
        loginSuccess: "Successful Login",
        isLoggedIn: true,
        email: action.payload.email,
        id: action.payload.id
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginErr: action.payload,
        loginSuccess: null,
        isLoggedIn: false
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("email");

      return {
        ...state,
        email: "",
        id: "",
        isLoggedIn: false
      };
    }
    case SIGNUP_START: {
      return {
        ...state,
        regErr: null,
        regSuccess: null
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        regErr: null,
        regSuccess: action.payload.successMsg,
        isLoggedIn: true,
        email: action.payload.email,
        id: action.payload.id
      };
    }
    case SIGNUP_FAILED: {
      return {
        ...state,
        regErr: action.payload,
        regSuccess: null
      };
    }
    default:
      return state;
  }
};
