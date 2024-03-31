import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// all users 
export const fetchUsers = createAsyncThunk("users/fetchUsers", async()=>{
    const res = await axios.get("http://localhost:3000/user")
    return res.data;
})

// add user 
export const fetchPostUser = createAsyncThunk("users/fetchPostUser", async(newUser)=>{
    const res = await axios.post("http://localhost:3000/user", newUser)
    return res.data;
})

// delete user 
export const fetchDeleteUser = createAsyncThunk("users/fetchDeleteUser", async(id)=>{
    const res = await axios.delete(`http://localhost:3000/user/${id}`)
    return res.data;
})

// update user 
export const fetchUpdateUser = createAsyncThunk("users/fetchUpdateUser", async({updateuser, id})=>{
    const res = await axios.put(`http://localhost:3000/user/${id}`, updateuser)
    return res.data;
})

const usersSlice = createSlice({
    name : "users",
    initialState : {
        isLoading : false,
        error : null,
        users : []
    },
    extraReducers : (builder)=>{
        // all users 
        builder.addCase(fetchUsers.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.error = null;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
            state.users = []
        })

        // add user 
        .addCase(fetchPostUser.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchPostUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchPostUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
            state.users = []
        })

        // delete user 
        builder.addCase(fetchDeleteUser.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchDeleteUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchDeleteUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
            state.users = []
        })

        // update user 
        builder.addCase(fetchUpdateUser.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchUpdateUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.error = null;

        });
        builder.addCase(fetchUpdateUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
            state.users = []
        })
    }
})

export default usersSlice.reducer;