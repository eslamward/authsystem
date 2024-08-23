import { apiSlice } from "../../app/api/apislice";


const authSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        register: builder.mutation(
            {
                query: (data) => ({
                    url: "/auth/register",
                    method: "POST",
                    body: { ...data }
                })
            }

        ),
        login: builder.mutation(
            {
                query: (data) => ({
                    url: "/auth/login",
                    method: "POST",
                    body: { ...data }
                })
            }
        )

    })
})

export const { useLoginMutation, useRegisterMutation } = authSlice;