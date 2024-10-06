import { createSlice } from "@reduxjs/toolkit";

const initialState =[
    {id: '0', name: "Trevor kim"},
    {id: '1', name: "Alex Ali"},
    {id: '2', name: "Pam Tukur"},
    
]
const usersSlice =createSlice({
    name: 'users',
    initialState,
    reducers:{

    }
})

export const selectAllUsers = (state)=> state.users
export default usersSlice.reducer