import {
  SIGN_UP,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS
} from "../../../constants/user/signup";

const initialState = {
  laoding: false,
  errors: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP:
      return { ...state, laoding: true, errors: "" };
    case SIGN_UP_SUCCESS:
      return { ...state, ...payload, laoding: false };
    case SIGN_UP_FAILURE:
      return { ...state, ...payload, laoding: false };

    default:
      return state;
  }
};
