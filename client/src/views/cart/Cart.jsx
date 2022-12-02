import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Nav1 from '../../components/Nav1'
import Nav2 from '../../components/Nav2'
import {useSelector, useDispatch} from 'react-redux'
import  {deleteFromCart,incrementQuantity,decrementQuantity, clearCart} from '../../Redux/CartRedux'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'

const Cart = () => {

  const navigate = useNavigate()
  const cart = useSelector(state=> state.cart)
  const dispatch = useDispatch()


  return (
   <div>
     <TopBar/>
      <Header/>   
    <div className="row border-top px-xl-5">
    <Nav1/>
        <Nav2/>
    </div>
     <div className="container-fluid pt-5">
  <div className="row px-xl-5">
    <div className="col-lg-8 table-responsive mb-5">
      <table className="table table-bordered text-center mb-0">
        <thead className="bg-secondary text-dark">
          <tr>
            <th>Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="align-middle">
         {cart.products.map((item,index)=>{
          return (
            
            <tr key={item._id}  >
            {/* {  console.log(item.product._id)} */}
            <td className="align-middle"><img src={"http://localhost:5005/getImage/" + item?.product.image[0].name} alt=""  style={{width: 50}} />{item.product.refProduct} </td>
            <td className="align-middle">{item.product.price}DT</td>
            <td className="align-middle">
              <div key={item.id} className="input-group quantity mx-auto" style={{width: 100}}>
                <div className="input-group-btn">
                  <button className="btn btn-sm btn-primary btn-minus"  onClick={() => dispatch(decrementQuantity(item))}>
                    <i className="fa fa-minus" />
                  </button>
                </div> 
              <input type="text" className="form-control form-control-sm bg-secondary text-center" value={item.quantity}  />
            
                <div className="input-group-btn">
                  <button className="btn btn-sm btn-primary btn-plus" onClick={() => dispatch(incrementQuantity(item))} >
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              
            </td>
            <td className="align-middle">{item.price}DT</td>
            <td className="align-middle"><button onClick={()=>dispatch(deleteFromCart(item))} className="btn btn-sm btn-primary"><i className="fa fa-times" /></button></td>
          </tr>
          )
         })}
          

        </tbody>
      </table>
      <div style={{display:"flex", justifyContent:"flex-end", marginTop:"10px"}} className="input-group-append">
            <button className="btn btn-primary" onClick={() => dispatch(clearCart())}>clear Cart</button>
          </div>
    </div>


  
         
  
    <div  className="col-lg-4">
      <form className="mb-5" action>
       
      </form>
      <div  className="card border-secondary mb-5">
        <div  className="card-header bg-secondary border-0">
          <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3 pt-1">
            <h6 className="font-weight-medium">Price Total</h6>
            <h6 className="font-weight-medium">{cart.pricetotal} DT</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Quantity Total</h6>
            <h6 className="font-weight-medium">{cart.quantitytotal} </h6>
          </div>
        </div>
        <div className="card-footer border-secondary bg-transparent">
         
          <button className="btn btn-block btn-primary my-3 py-3" onClick={()=> navigate("/Order")} >Proceed To Checkout</button>
        </div>
      </div>
    </div>
  </div>
</div>
<Footer/>
   </div>
  )
}

export default Cart