import React, { useEffect,useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import OrderServices from '../../../services/OrdersServices';
const GetOrders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])



  const getall =()=>{
    OrderServices.getorders()?.then(res=>{
      console.log("orders",res)
      setOrders(res.data.data)
    }).catch(err=>{
      console.log(err)
    })
  }
  useEffect(() => {
    getall()
  }, [])

  const onDelete=(id)=>{
    OrderServices.remove(id).then(res=>{
      getall()
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div>
 
 <div class="card">
  <div class="card-body">
    <h4 style={{display:"flex", alignItems:"center", justifyContent:"center"}} class="card-title"> liste of Orders</h4>
    
    <div class="table-responsive pt-3">
      <table class="table">
        <thead>
          <tr>
            <th>
              index
            </th>
            <th>
              ref
            </th>
            <th>
              clientName
            </th>
            <th>
             date
            </th>
            <th>
              Quantitytotal
            </th>
            <th>
              Pricetotal
            </th>
            <th>
              Products
            </th>
            <th width="125px">
              action
            </th>
          </tr>
        </thead>
        <tbody>
         {orders.map((item,index)=>{
          return (
            <tr>
            <td>
              {index}
            </td>
            <td>
             
            </td>
            <td>
             {item.client.firstName}  {item.client.lastName}
            </td>
            <td>
              {item.date}
            </td>
            <td>
              {item.QuantityTotal}
            </td>
            <td>
              {item.priceTotal}
            </td>
            <td>
              {item.products.length}
            </td>
            <td>
                                       
                                       <ul style={{display:"flex",alignItems:"center",justifyContent:"center",}} class="list-inline m-0">
                                           <li class="list-inline-item">
                                               <button onClick={()=>navigate(`/getOrderdetails/${item._id}`)} class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i class="fa fa-eye" aria-hidden="true"></i></button>
                                           </li>
                                           <li class="list-inline-item">
                                           <Link to={`/update/${item._id}`}>
                                               <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
                                               </Link>
                                           </li>
                                           <li class="list-inline-item">
                                               <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={()=>onDelete(item._id)}><i class="fa fa-trash-o" style={{fontSize:"10px",color:"yellow"}}></i></button>
                                           </li>
                                       </ul>
                                   </td> 
          </tr>
          )
         })}   
        </tbody>
      </table>
    </div>
  </div>
</div>


    </div>
  )
}

export default GetOrders