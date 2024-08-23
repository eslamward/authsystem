import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookies'
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    credentials: "include",
    headers: (headers) => {
        const token = Cookies.get("token")
        if (token) {
            headers.set("Authorization", token)
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: () => ({})
})
