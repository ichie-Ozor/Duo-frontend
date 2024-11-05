import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  ERRORS,
  RECOVER_USER,
  MY_WALLET,
  LICENSE_DATA,
} from "../types";

const initialState = {
  authenticated: false,
  user: {},
  loadingLogin: false,
  loadingSignup: false,
  my_wallet: {},
  error: "",
  loadingApp: false,
  recoverPhone: { code: "", phone: "" },
  licence_data: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.payload?.user,
        my_wallet:
          action.payload && action.payload?.my_wallet?.id > 0
            ? action.payload.my_wallet
            : state.my_wallet,
        authenticated: true,
      };
    case MY_WALLET:
      return {
        ...state,
        my_wallet: action.payload,
      };
    case LICENSE_DATA:
      return {
        ...state,
        licence_data: action.payload,
      };
    case RECOVER_USER:
      return {
        ...state,
        recoverPhone: action.payload,
      };
    case ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: "",
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: {},
      };
    default:
      return state;
  }
}
