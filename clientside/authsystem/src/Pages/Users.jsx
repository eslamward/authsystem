import { useUsersQuery } from "../redux/featcher/users/userSlices"

function Users() {
    const { data, isError, error, isLoading, isSuccess } = useUsersQuery()

    return (
        <>

            <div className="mx-auto w-2/3 mt-10 ">
                <p className="
                mx-auto w-2/3 
                ">{isLoading && !isError && "Loading...."}</p>
                <p className="
                    mx-auto w-2/3 
                ">{isError && !isLoading && error.data?.message}</p>
                <p>{isSuccess && !isLoading && !isError && data &&
                    (data.users.map(user =>
                    (<li key={user.id}
                        className="
                        flex gap-5
                        "
                    >
                        <p className="w-2/3">{user.email}</p>
                        <p className="w-1/3">{user.type} </p>
                        <p className="w-1/3"> {user.created_at}</p>

                    </li>)
                    ))

                }
                </p>

            </div >


        </>

    )
}

export default Users
