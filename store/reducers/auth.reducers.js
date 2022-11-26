import { createSlice } from "@reduxjs/toolkit";
import { AUTH_STATE_CHANGE } from "../constants";

const initialState = {status : ""}
export const authSlice = createSlice({
    name : "auth",
    initialState,
        reducers : {
            login: (state, action) => {
                console.log(action.payload.toto)
            }
        }
})

export const {login} = authSlice.actions;
export const authStatus = (state) => state.status;
export default authSlice.reducer;
