import { call, put, takeLatest } from "redux-saga/effects";
import { SIGN_UP } from "../../../constants/user/signup";
import { Images } from "../../../constants";
import * as actions from "../../actions/user/signup";
import { loginSuccess } from "../../actions/auth/login";
import { api } from "../../../utils/api";
import { getUserFromEmail } from "../../../utils/helpers";
import { setToken } from "../../../utils/auth";

export function* signupAsync({ payload }) {
  try {
    const { navigate } = payload;
    const response = yield call(api.user.signUp, payload);
    setToken(response.data.data.user);
    const profile = {
      avatar: Images.Profile,
      name: getUserFromEmail(response.data.data.user.email),
      type: "Seller",
      plan: "Pro",
      rating: 4.8
    };

    // yield put(actions.signUpSuccess());
    yield put(loginSuccess({ profile }));
    navigate("Home");
  } catch (error) {
    const errors = error.response.data.message;
    yield put(actions.signUpFailure({ errors }));
  }
}
/** WATCHERS */
export function* watchSignup() {
  yield takeLatest(SIGN_UP, signupAsync);
}
