import { Link } from "react-router-dom"
import { useUsersQuery } from "../redux/featcher/users/userSlices"

function Users() {
    const { data, isError, error, isLoading, isSuccess } = useUsersQuery()

    return (
        <>

            <div className="mx-auto w-2/3 mt-10 ">
                {isLoading && !isError && <p className="
                mx-auto w-2/3 
                ">"Loading...." </p>}
                {isError && error &&
                    <div className='bg-red-500 text-white font-mono p-4 rounded-md flex gap-4 items-center justify-between' >
                        <div className='bg-red-500 text-white font-mono p-4 rounded-md'>
                            {error.data.message}
                        </div>
                        <div className="flex gap-4">
                            <Link to={"/auth/login"} className="bg-white text-stone-600 px-4 py-2  rounded-md">Login</Link>
                            <Link to={"/auth/register"} className="bg-white text-stone-600 px-4 py-2  rounded-md" > register</Link>
                        </div>
                    </div>
                }

                {isSuccess && !isLoading && !isError && data &&
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

            </div >


        </>

    )
}

export default Users
