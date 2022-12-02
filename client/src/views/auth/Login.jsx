
import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoginService from '../../Services/LoginService'
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../Redux/UserRedux';

const Login = () => {
    const dispatch = useDispatch()
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
  dispatch(loginStart())
  LoginService.create(data).then(res=>{
    console.log(res)
    dispatch(loginSuccess(res.data.data))
    setData(res.data)
    window.location="/"
    localStorage.setItem('user',JSON.stringify(res.data))
    
    
  }).catch((err)=>{
    console.log("err",err)
      dispatch(loginFailure())
        setFormErrors(validate(data,err));
        setIsSubmit(true);
  
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
    <div   style={{width:"100%", height:"100px"}} >
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"200px"}}>
        <div style={{hight:"50%", width:"50%"}} >
            <span style={{marginRight:"150px",marginLeft:"50px", fontSize:"35px", fontWeight:"inherit",color:"red"}} > Welcome To IDAS Shop</span>
        </div>
    <div style={{width:"50%", marginRight:"200px"}} >
       <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  value={data.email}  name="email" onChange={handleChange} />
        <Form.Text  className="text-muted">
        <p style={{color:"red"}}>{formErrors.email} </p> 
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  placeholder="Password"  value={data.password}  name="password" onChange={handleChange} />
        <p style={{color:"red"}}>{formErrors.password} </p> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    </div>
    </div>
    
    
  )
}

export default Login