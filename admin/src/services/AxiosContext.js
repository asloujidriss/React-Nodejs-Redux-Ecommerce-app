import axios from 'axios'

const user = JSON.parse(localStorage.getItem("persist:root")) ?
 JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user) : ''

const TOKEN = user ?  user?.currentuser?.accessToken : ""

export default axios.create({
  baseURL :  "http://localhost:5005",
    // baseURL :  `${process.env.REACT_APP_SERVER_DOMAIN}`,

     headers:{
      authorization:`${TOKEN}`,
      "Content-Type": "application/json",
      Accept: "multipart/form-data"
    }        
})






