import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Alert } from 'antd';
import Marquee from 'react-fast-marquee'
import './ResetPassword.css'

const ResetPassword = () => {

   const [password, setPassword] = useState('')
   const [confirmpassword, setConfirmPassword] = useState('')
  const {resetPasswordToken} = useParams()
  const [show, setShow] = useState(false)
const [message, setMessage] = useState('')
   


const onSubmitHandler =async(e)=>{

    e.preventDefault()

    try {
      const res = await axios.post(`http://localhost:5005/users/resetPassword/${resetPasswordToken}`,{password})
      console.log(res)
      setMessage(res.data.message)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      },9000)


    } catch (error) {
      console.log(error)
      setMessage(error.response?.data.message)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 9000);
    }


}

  return (
    
     
    <div className="container d-flex justify-content-center align-items-center vh-100">
      
    <div className="bg-white text-center p-5 mt-3 center">
    <div>
    {show ? 
  <Alert style={{width:"350px"}}
    banner
    message={
      <Marquee pauseOnHover gradient={false}>
        {message}
       
      </Marquee>
    }
  /> : ""
}
</div>
      <h3>Forgot Password </h3>
      <p>please enter your New password</p>
      <form className="pb-3" >
        <div className="form-group">
          <input type="text" className="form-control" placeholder="New password*" required onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <div style={{marginTop:"10px"}} className="form-group">
          <input type="text" className="form-control" placeholder="Confirm password*" required onChange={(e)=> setConfirmPassword(e.target.value)} />
        </div>
      </form>
      <button type="button" className="btn" onClick={onSubmitHandler} >Reset Password</button>
    </div>
  </div>
  
  )
}

export default ResetPassword