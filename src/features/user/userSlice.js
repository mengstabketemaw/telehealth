import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const loginUser = createAsyncThunk("user/loginUser",async (credential)=>{
    const response = await client.post("/login",credential);
    console.log(response)
    return response;
})


const userSlice = createSlice({
    name:"user",
    initialState:{status:"nothing",data:"none"},
    reducers:{
        
    },
    extraReducers(builder){
        builder
        .addCase(loginUser.pending,(state)=>{
            state.status="loading";
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.status="success";
            state.data=action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.status="error";
            state.error=action.error.message;
        })
    }
});

export default userSlice.reducer;