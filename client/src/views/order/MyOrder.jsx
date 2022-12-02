import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../../components/TopBar';

import UsersService from '../../Services/UserService';


const MyOrder = () => {


const[data, setData]= useState({})

const id = useSelector(state=> state.user.currentUser._id)

console.log()



const getmyorder =()=>{
    UsersService.getOne(id).then(res=>{
        console.log("myorder",res)
        setData(res.data.data)
    }).catch(err=>{
        console.log(err)
    })
}

useEffect(() => {
    getmyorder()
},[])


  return (
    <div>
        <TopBar/>
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
              state
            </th>
          </tr>
        </thead>
        <tbody>
        {data?.orders?.map((item,index)=>{
                return (
            <tr>
            <td>
              {index}
            </td>
            <td>
             
            </td>
            <td>
             {data.firstName}  {data.lastName}
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
            {item.status}
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

export default MyOrder