import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  Images
} from "../../../constants";

export const initialState = {
  loading: false,
  errors: "",
  profile: {
    avatar: Images.Profile,
    name: "Rachel Kinuthia",
    type: "Seller",
    plan: "Pro",
    rating: 4.8
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, ...payload, errors: "", loading: true };
    case LOGIN_FAILURE:
      return { ...state, ...payload, loading: false };
    case LOGIN_SUCCESS:
      return { ...state, ...payload, loading: false };

    default:
      return state;
  }
};
