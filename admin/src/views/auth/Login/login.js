import React,{ useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginfailure, loginstart, loginsuccess } from '../../../Redux/UserRedux'


import LoginService from '../../../services/LoginService'

const Login=()=> {
  const  dispatch = useDispatch()
    const navigate = useNavigate()
    const initialValues = {email: "", password: "" };
    const [data, setData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

 
const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };


const handleSubmit =(e)=>{
  e.preventDefault()
 dispatch(loginstart())

  LoginService.create(data).then(res=>{
  
    setData(res.data)
    window.location="/"
    dispatch(loginsuccess(res.data))
     //localStorage.setItem('user',JSON.stringify(res.data))
    
  }).catch((err)=>{
    console.log("err",err)
        setFormErrors(validate(data,err));
        setIsSubmit(true);
       dispatch(loginfailure())
  })
}

useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [formErrors]);

  const validate = (values,err) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(err.response && err.response.status === 406)
    {
      errors.email =err.response.data.message
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if(err.response && err.response.status == 404)
    {
      errors.password =err.response.data.message
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div>

       <div className="login-container">
        
        <div className="login-box animated fadeInDown">
            <div className="login-logo"></div>
            <div className="login-body">
                <div className="login-title"><strong>Welcome</strong>, Please login</div>
                <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="col-md-12">

                        <input type="email" className="form-control"  value={data.email} placeholder="Email" required="" name="email"  onChange={handleChange}/>
                        <p style={{color:"white"}}>{formErrors.email} </p> 
                            
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-12">
                        <input type="password" className="form-control" placeholder="Password" required="" name="password" value={data.password} onChange={handleChange}/>
                        <p style={{color:"white"}}>{formErrors.password} </p> 
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-6">
                        <a href="/forgetpassword"  className="btn btn-link btn-block">Forgot password?</a>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-info btn-block" type="submit" >Log In</button>
                        <a href="/register" className="btn btn-link btn-block">or create an account</a>
                    </div>
                </div>
                </form>
            </div>
            <div className="login-footer">
                <div className="pull-left">
                    &copy; 2022 IDAS APP
                </div>
               
            </div>
        </div>
        
    </div>
    </div>
  )
}

export default Login