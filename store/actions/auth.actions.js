import { AUTH_STATE_CHANGE } from "../constants";

export const changeAuthState = (state) => ({ type : AUTH_STATE_CHANGE, state})