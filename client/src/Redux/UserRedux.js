import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.currentUser = action.payload
            state.isFetching =false
            state.error = false
        },
        loginStart:(state)=>{
            state.currentUser =null
            state.isFetching =true
            state.error = false
        },
        loginFailure:(state)=>{
         state.currentUser=null
         state.isFetching =false
         state.error=true
        },
        SignOut:(state)=>{
            state.currentUser=null
            state.isFetching=false
            state.error =false 
        },
    }
})

export const {loginSuccess, loginStart,loginFailure,SignOut}= userSlice.actions

export default userSlice.reducer