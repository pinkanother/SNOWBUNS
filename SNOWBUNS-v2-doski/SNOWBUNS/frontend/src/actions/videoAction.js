import {
  requestedMessage,
  successMessage,
  failedMessage,
} from "../helpers/msgHelper";
import apiBase from "../helpers/apiBase";
import { UPLOAD_VIDEO, INCREASE_NUM, GET_CHANNEL_INFO } from "./actionTypes";
import { toast } from "react-toastify";

// Upload video action
export const uploadVideo = (formData) => async (dispatch) => {
  dispatch({ type: requestedMessage(UPLOAD_VIDEO) });
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await apiBase.post("/api/video/upload", formData, config);
    console.log(data);
    toast.success(data.message);
    dispatch({
      type: successMessage(UPLOAD_VIDEO),
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: failedMessage(UPLOAD_VIDEO),
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const increaseNum = (id) => async (dispatch) => {
  console.log("object");
  dispatch({ type: requestedMessage(UPLOAD_VIDEO) });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await apiBase.put("/api/video/" + id, config);
    toast.success(data.message);
    dispatch({
      type: successMessage(INCREASE_NUM),
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: failedMessage(UPLOAD_VIDEO),
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getChannelInfo = (id) => async (dispatch) => {
  dispatch({ type: requestedMessage(UPLOAD_VIDEO) });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await apiBase.get("/api/video/" + id, config);    
    dispatch({
      type: successMessage(GET_CHANNEL_INFO),
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: failedMessage(UPLOAD_VIDEO),
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

