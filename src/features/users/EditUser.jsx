import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchUpdateUser, fetchUsers } from "./usersSlice";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      _id: location.state._id,
      name: location.state.name,
      email: location.state.email,
    },
  });
  const onSubmit = async (data) => {
    
    const updateuser = {
      name: (data?.name && data?.name) || location.state.name,
      email: (data?.email && data?.email) || location.state.email,
    };
    await dispatch(fetchUpdateUser({ updateuser, id }));
    await dispatch(fetchUsers());
    navigate("/all-users");
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-2">Edit User</h2>
      <form
        className="w-1/3 mx-auto p-10 border-2 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label className="text-md font-bold" htmlFor="name">
            Name :
          </label>
          <input
            className="border-2 rounded-md py-1 px-2 w-full"
            placeholder="Enter your name ..."
            type="text"
            name="name"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="mb-3">
          <label className="text-md font-bold" htmlFor="email">
            Email :
          </label>
          <input
            className="border-2 rounded-md py-1 px-2 w-full"
            placeholder="Enter your email ..."
            type="email"
            name="email"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white py-1 px-4 rounded-md my-1 font-bold "
            type="submit"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
