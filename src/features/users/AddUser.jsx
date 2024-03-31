import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostUser, fetchUsers } from "./usersSlice";
import Swal from "sweetalert2";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const res = await dispatch(fetchPostUser(data));
    if (res?.type === "users/fetchPostUser/fulfilled") {
      await dispatch(fetchUsers());
      navigate("/all-users");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-2">Add User</h2>
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
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
