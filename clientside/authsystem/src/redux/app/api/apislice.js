import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie'
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = Cookies.get("token")
        if (token) {

            headers.set("Authorization", token)
        }
        return headers
    }

})


const checkTokenExpiration = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403 || result?.error?.status) {

        Cookies.remove("token")

    }
    return result
}


export const apiSlice = createApi({
    baseQuery: checkTokenExpiration,
    endpoints: () => ({})
})
