import {Navigate} from "react-router-dom";

import jwt_decode from "jwt-decode"

import { useSelector } from "react-redux";


const user = JSON.parse(localStorage.getItem("persist:root")) ?
 JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user) : '';

//  const user = useSelector(state => state.user?.currentuser)
 console.log(user)
 const token = user?.currentuser.accessToken
 
 const decoded = jwt_decode(token);
 console.log("decoded", decoded)

 const role = decoded.role ;
 

 export const PrivateRoute =({children})=>{
    return user ? children : <Navigate to ="/login" />
}


 export const PrivateRoute1 =({children})=>{
    return role === "Admin" ? children : <Navigate to ="/error" />
}

export const PrivateRoute2 =({children})=>{
    return role === "Admin" || role === "SuperAdmin"  ? children : <Navigate to ="/error" />
}





