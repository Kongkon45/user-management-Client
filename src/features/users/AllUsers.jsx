import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeleteUser, fetchUsers } from './usersSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const {isLoading, error, users} = useSelector((state)=>state.users);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUsers())
    },[])

    const handleDeleteUser = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            
            if (result.isConfirmed) {
                await dispatch(fetchDeleteUser(id));
                await dispatch(fetchUsers())
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            // Handle error
            Swal.fire({
                title: "Error",
                text: "Failed to delete user.",
                icon: "error"
            });
        }
    };
    

  return (
    <div>
        <h2 className='text-2xl font-bold text-center my-2'>All Users</h2>
        {isLoading && <h2>User Data is Loading...</h2>}
        {error && <p>{error}</p>}
        <table className='w-1/2 mx-auto'>
            <thead>
                <tr>
                    <th className='border-2 border-black'>SL</th>
                    <th className='border-2 border-black'>Name</th>
                    <th className='border-2 border-black'>Email</th>
                    <th className='border-2 border-black'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users && users?.data?.map((user, index)=>{
                        const {name, email, _id} = user;
                        return <tr key={index} className='text-center'>
                            <td className='border-2 border-gray-500'>{index + 1}</td>
                            <td className='border-2 border-gray-500'>{name}</td>
                            <td className='border-2 border-gray-500'>{email}</td>
                            <td className='border-2 border-gray-500'>
                                <div className='flex justify-around'>
                                <Link to={`/edit-user/${_id}`} state={{_id, name, email}}>
                                <button className='bg-green-500 text-white py-1 px-4 rounded-md my-1 mr-5 font-bold '>Edit</button>
                                </Link>
                                <button onClick={()=>handleDeleteUser(_id)} className='bg-red-500 text-white py-1 px-4 rounded-md my-1 font-bold '>Delete</button>
                                </div>
                            </td>
                        </tr> 
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default AllUsers