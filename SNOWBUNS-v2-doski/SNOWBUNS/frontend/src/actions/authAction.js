import {
  requestedMessage,
  successMessage,
  failedMessage,
} from "../helpers/msgHelper";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOG_OUT,
  SET_CURRENT_USER,
  GET_USERS,
  UPDATE_USERS,
} from "./actionTypes";
import apiBase from "../helpers/apiBase";
import { toast } from "react-toastify";
import axios from "axios";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: requestedMessage(LOGIN_USER) });
    const userInfo = await apiBase.post("/api/auth/login", { email, password });
    const { message, data } = userInfo.data;
    toast.success(message);
    const token = data.token;
    const id = data.user._id;
    axios.defaults.headers.common["Authorization"] = token;
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);

    dispatch({ type: successMessage(LOGIN_USER), payload: data });
    navigate("/");
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: failedMessage(LOGIN_USER), payload: error });
  }
};

export const register =
  (email, channelName, aboutChannel, password, cfPassword, navigate) => async (dispatch) => {
    dispatch({ type: requestedMessage(REGISTER_USER) });
    if (password !== cfPassword) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      dispatch({ type: requestedMessage(REGISTER_USER) });
      const userInfo = await apiBase.post("/api/auth/register", {
        email,
        channelName,
        aboutChannel,
        password,
      });
      const { message } = userInfo.data;
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.data[0].msg);
      dispatch({ type: failedMessage(REGISTER_USER), payload: error });
    }
  };

export const checkAuthentication = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch({ type: successMessage(SET_CURRENT_USER) }); // Set isAuthenticated to 1
    try {
      const users = await apiBase.get("/api/auth/");
      dispatch({
        type: successMessage(GET_USERS),
        payload: users.data,
      });
    } catch (error) {
      toast.error(error.response.data.data[0].msg);
      dispatch({ type: failedMessage(REGISTER_USER), payload: error });
    }
  } else {
    dispatch({ type: LOG_OUT }); // Set isAuthenticated to 0
  }
};

export const channelUpdate = (data) => async (dispatch) => {
  try {
    const response = await apiBase.put("/api/auth/", data);

    dispatch({
      type: successMessage(UPDATE_USERS),
      payload: response.data,
    });
    console.log(response.data);
  } catch (error) {
    toast.error(error.response.data.data[0].msg);
    dispatch({ type: failedMessage(REGISTER_USER), payload: error });
  }
};

export const logOut = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  dispatch({ type: LOG_OUT });
  toast.success("LogOut Successfully");
};
