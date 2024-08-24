
import { apiSlice } from "../../app/api/apislice";



export const userSlices = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        users: builder.query({
            query: () => ({
                url: "/users",
                method: "GET"
            })
        }
        )
    })
})

export const { useUsersQuery } = userSlices