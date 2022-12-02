import {createSlice} from '@reduxjs/toolkit'


const UserSlice = createSlice({
    name:"user",
    initialState:{
        currentuser:null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginstart:(state)=>{
            state.currentuser=null
            state.isFetching=true
            state.error =false
        },
        loginsuccess:(state,action)=>{ 
            state.currentuser=action.payload
            state.isFetching=false
            state.error =false
        },
        loginfailure:(state)=>{
            state.currentuser=null
            state.isFetching=false
            state.error =true
        },
        SignOut:(state)=>{
            state.currentuser=null
            state.isFetching=false
            state.error =false 
        },
       
    }
})

export const {loginstart, loginsuccess, loginfailure,SignOut} = UserSlice.actions

export default UserSlice.reducer