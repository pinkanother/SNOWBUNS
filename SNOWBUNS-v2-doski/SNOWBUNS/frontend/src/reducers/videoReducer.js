import {
  requestedMessage,
  successMessage,
  failedMessage,
} from "../helpers/msgHelper";
import { UPLOAD_VIDEO, INCREASE_NUM, GET_CHANNEL_INFO } from "../actions/actionTypes";

const initialState = {
  loading: false,
  thumbnail: [],
  url: "",
  info: [],
  error: null,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestedMessage(UPLOAD_VIDEO):
      return {
        ...state,
        loading: true,
      };
    case successMessage(UPLOAD_VIDEO):
      return {
        ...state,
        loading: false,
        url: action.payload,
        error: null,
      };
    case successMessage(GET_CHANNEL_INFO):
      return {
        ...state,
        loading: false,
        info: action.payload,
        error: null,
      };
    case successMessage(INCREASE_NUM):
      return {
        ...state,
        loading: false,
        url: action.payload.url,
        error: null,
      };
    case failedMessage(UPLOAD_VIDEO):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // case successMessage(GET_THUMBNAIL):
    //   return {
    //     ...state,
    //     loading: false,
    //     thumbnail: action.payload,
    //     error: null,
    //   };
    default:
      return state;
  }
};

export default videoReducer;
