import axios from "axios"


  
   const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}")?.currentUser?.accessToken
   const REFRESH_TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}")?.currentUser?.refreshToken

//console.log(TOKEN)
//console.log(REFRESH_TOKEN)

axios.defaults.headers["authorization"] = TOKEN;
//axios.defaults.body["token"] = REFRESH_TOKEN;
export default axios.create({
    baseURL: "http://localhost:5005" 
})