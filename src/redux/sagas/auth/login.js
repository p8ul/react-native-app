import { put, call, takeLatest } from "redux-saga/effects";
import { LOGIN, Images } from "../../../constants";
import { loginSuccess, loginFailure } from "../../actions/auth/login";
import { api } from "../../../utils/api";
import { getUserFromEmail } from "../../../utils/helpers";
import { setToken } from "../../../utils/auth";

export function* loginAsync({ payload }) {
  try {
    const { navigate } = payload;
    const response = yield call(api.auth.login, payload);
    setToken(response.data.data.user);
    const profile = {
      avatar: Images.Profile,
      name: getUserFromEmail(response.data.data.user.email),
      type: "Seller",
      plan: "Pro",
      rating: 4.8
    };
    yield put(loginSuccess({ profile }));
    navigate("Home");
  } catch (error) {
    yield put(loginFailure({ errors: error.response.data.message }));
  }
}
/** WATCHERS */
export function* watchLogin() {
  yield takeLatest(LOGIN, loginAsync);
}
