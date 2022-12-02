import { createSlice } from "@reduxjs/toolkit";


const ProductSlice = createSlice({
    name:"product",
    initialState:{ 
        products:[],
        isfetching:false,
        error:false
    },
    reducers:{
        AddProductStart:(state)=>{
            state.isfetching=true
            state.error=false
        },
        AddProductFailure:(state)=>{
            state.isfetching =false
            state.error =true
        },
        AddProductSuccess:(state,action)=>{
            state.products.push(action.payload)
            state.isfetching=false
            state.error = false
        },
        DeleteProductStart:(state)=>{
            state.isfetching=true
            state.error=false
        },
        DeleteProductSuccess:(state, action)=>{
            state.isfetching=false
            state.error=true
            state.products.map(p=>{
                if(p._id === action.payload._id){
                    state.products.filter(item => item._id !== p._id)
                }
            })
        },
        DeleteProductFailure:(state)=>{
            state.isfetching=false
            state.error= true
        },
        GetProductStart:(state)=>{ 
            state.isfetching=true
            state.error=false
        },
        GetProductFailure:(state)=>{ 
            state.isfetching=false
            state.error=true
        },
        GetProductSuccess:(state,action)=>{ 
            state.isfetching=true
            state.error=false
            state.products.push(action.payload)
        },
        
    }
})

export const {AddProductSuccess,AddProductStart,AddProductFailure,
               DeleteProductStart,DeleteProductFailure,DeleteProductSuccess,
               GetProductStart,GetProductFailure,GetProductSuccess } = ProductSlice.actions

export default ProductSlice.reducer