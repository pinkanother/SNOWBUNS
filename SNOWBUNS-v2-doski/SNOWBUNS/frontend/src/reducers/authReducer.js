import {
  requestedMessage,
  successMessage,
  failedMessage,
} from "../helpers/msgHelper";
import {
  REGISTER_USER,
  LOGIN_USER,
  SET_CURRENT_USER,
  LOG_OUT,
  GET_USERS,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: null,
  users: [],
  token: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestedMessage(LOGIN_USER):
      return {
        ...state,
        isLoading: true,
      };
    case successMessage(LOGIN_USER):
      console.log(action.payload.user);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case failedMessage(LOGIN_USER):
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      };
    case requestedMessage(REGISTER_USER):
      return {
        ...state,
        isLoading: false,
      };
    case successMessage(REGISTER_USER):
      return {
        ...state,
        isAuthenticated: false,
      };

    case failedMessage(REGISTER_USER):
      return {
        ...state,
        isAuthenticated: false,
      };
    case successMessage(SET_CURRENT_USER):
      return {
        ...state,
        isAuthenticated: true,
      };
    case successMessage(GET_USERS):
      return {
        ...state,
        users: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};

export default authReducer;
