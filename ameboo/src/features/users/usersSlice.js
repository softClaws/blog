import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const USER_URL = 'https://jsonplaceholder.typicode.com/users'


// const initialState =[
    // {id: '0', name: "Trevor kim"},
    // {id: '1', name: "Alex Ali"},
    // {id: '2', name: "Pam Tukur"},
    
// ]

const initialState =[]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async()=>{
    try {
        const response = await axios.get(USER_URL)
        return response.data
    } catch (error) {
       return error.message

        
    }
})
const usersSlice =createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            return action.payload
        })
    }
})


export const selectAllUsers = (state)=> state.users
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)

export default usersSlice.reducer