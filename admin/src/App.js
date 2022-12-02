
import {
 
  Route,Navigate, BrowserRouter, Routes} from "react-router-dom";

import Home from './views/home/Home';
import Layout from './components/Layout/Layout'


import GetAllProducts from './views/home/Products/GetAllProducts';
import UpdateProduct from './views/home/Products/UpdateProduct'

import Error from './components/errors/Error';


import Register from './views/home/Admins/Register';
import Login from './views/auth/Login/login';

import GetUsers from './views/home/MyUsers/GetAllUsers'
import Updateuser from './views/home/MyUsers/UpDateUser'


import Category from './views/home/Categories/GetAllCategories'
import AddCategory from "./views/home/Categories/AddCategory";


import Subcategories from './views/home/subcategories/Getsubcategories'
import SubcategoryDetails from "./views/home/subcategories/SubcategoryDetails";

import Calendar from "./views/home/calendar/Calendar";
import GetCalendars from "./views/home/calendar/GetMyCalendar";

import GetOrders from "./views/home/orders/GetOrders";
import GetOrderDetails from "./views/home/orders/GetOrderDetails";

 import  {PrivateRoute, PrivateRoute1,PrivateRoute2 } from './components/PrivateRoute'
import ForgetPassword from "./views/auth/forgetpassword/ForgetPassword";
import ResetPassword from "./views/auth/resetpassword/ResetPassword";
import UserChart from "./components/UserChart";





function App() {
  

  return (
<>

    <BrowserRouter>
     <Routes> 
     <Route path="/" element={<Home/> }>
       <Route  index path="/" element={<Layout />} />
       
       <Route index path="/getallproducts" element={<GetAllProducts/>}/>
       <Route index path="/updateproduct/:id" element={<UpdateProduct/>}/>
  

       {/* <Route index path="/getusers" element ={<PrivateRoute2><GetUsers/></PrivateRoute2>}/> */}
       <Route index path="/getusers" element ={<GetUsers/>}/>
       <Route index path="/updateuser/:id" element ={<Updateuser/>}/>
       
       <Route index path="/getcategories" element ={<Category/>}/>
       <Route index path="/addcategory" element ={<AddCategory/>}/>

       <Route index path="/gesubcategories" element ={<Subcategories/>}/>
       <Route path="/subcategorydetails/:id" element={<SubcategoryDetails/>} />

       <Route index path="/Calendar" element ={<Calendar/> }/>
       <Route index path="/GetMyCalendar" element ={<GetCalendars/>}/>

       <Route index path="/GetOrders" element ={<GetOrders/>}/>
       <Route index path="/getOrderdetails/:id" element ={<GetOrderDetails/>}/>

       <Route index path="/stats" element ={<UserChart/>}/>


</Route>
     
         
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>} />
        <Route path="/error" exact element={<Error/>} />

        <Route index path="/forgetpassword" element ={<ForgetPassword/>}/> 
       <Route index path="/resetPassword/:resetPasswordToken" element ={<ResetPassword/>}/> 
       </Routes>

    </BrowserRouter>
  </>
  )
}

export default App;
