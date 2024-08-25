import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"

const initialState = {
    email: "",
    token: ""
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { userEmail, token } = action.payload
            Cookies.set("token", token)
            Cookies.set("email", userEmail)
            state.email = userEmail
            state.token = token

        },
        removeUserData: (state) => {
            state.email = "",
                state.token = ""
        }
    }
})


export const { setUserData, removeUserData } = authSlice.actions