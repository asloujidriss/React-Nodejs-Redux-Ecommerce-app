import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Home from './views/home/Home';
import ProductDetail from './views/Product/ProductDetails'
import Cart from "./views/cart/Cart";
import Order from "./views/order/Order";
import Register from "./views/auth/Register";


import Login from "./views/auth/Login";
import SubcategoryDetails from './views/subcategories/SubcategoryDetails';
import MyOrder from './views/order/MyOrder';

function App() {
  return (
   
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home/>} />
 <Route path="/productdetails/:id" element={<ProductDetail/>} />
 <Route path="/cart" element={<Cart/>} />
 <Route path="/order" element={<Order/>} />
 <Route path="/myorder" element={<MyOrder/>} />

 <Route path="/subcategorydetails/:id" element={<SubcategoryDetails/>} />
 <Route path="/Buyproduct/:id" element={<SubcategoryDetails/>} />

  <Route path="/register" element={<Register/>} />
  <Route path="/login" element={<Login/>} />
  </Routes>
  </BrowserRouter>
     
  
  );
}
export default App;
