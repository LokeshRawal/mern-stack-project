import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authSvc from "../pages/home/auth/auth.service";

export const getLoggedInUser = createAsyncThunk(
    "User/getLoggedInUser",
    async (data = null, thunkAPI) => {
        try{
            let response = await authSvc.getLoggedInUser();
            return response.result
        } catch(err) {
            throw err;
        }
    }
)

const UserSlicer = createSlice({
    name: "User",
    initialState: {
        loggedInUser: null
    },
    reducers: {
        setLoggedInUser: (state, action) => {
            let payload = action.payload;
            state.loggedInUser = payload;
        }
    },
    extraReducers: (builders) => {
        builders.addCase(getLoggedInUser.fulfilled, (state, action) => {
            state.loggedInUser = action.payload;
        })
        builders.addCase(getLoggedInUser.rejected, (state, action) => {
            state.loggedInUser = null;
        })
    }
})

export const {setLoggedInUser, getLoggedInState} = UserSlicer.actions;
export default UserSlicer.reducer;