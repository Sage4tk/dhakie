import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserSlice } from "./states";
import { User } from "firebase/auth";

export const initialState:IUserSlice = {
    user:null
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SetUserReducer: (state, actions:PayloadAction<User | null>) => {
            state.user = actions.payload
        }

    }
});

/** EXPORT ACTIONS HERE **/
export const {
    SetUserReducer
} = UserSlice.actions
export default UserSlice.reducer