import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import SubcategoryServices from '../../../services/SubcategoryServices'
import './subcategorydetails.css'

function SubcategoryDetails() {

const [subcategory,setSubcategory]= useState([])

const {id} = useParams()



const getdetails =()=>{
    SubcategoryServices.getById(id).then(res=>{
        console.log("subdetails",res)
        setSubcategory(res.data.data)
    }).catch(err=>{
        console.log(err)
    })
}
useEffect(() => {
    getdetails()
}, [])


const ondelete =(id)=>{
  axios.delete(`http://localhost:5005/subcategories/deleteproduct/${subcategory._id}/product/${id}`).then(res=>{
console.log("productdelete",res)
getdetails()

  }).catch(err=>{
    console.log(err)
  })
}

  return (
    <div>
      
      <div className="row flex-grow">
  <div className="col-12 grid-margin stretch-card">
    <div className="card card-rounded">
      <div className="card-body">
        <div className="d-sm-flex justify-content-between align-items-start">
          <div  >
            
            <p style={{display:"flex",marginLeft:"270px", fontSize:"25px",color:"#A9A9A9"}} className="card-subtitle card-subtitle-dash"><strong>liste products of subcategory {subcategory.name}</strong></p>
          </div>
          <div>
            <button className="btn btn-primary btn-lg text-white mb-0 me-0" type="button"><i className="mdi mdi-account-plus" />Add new Products</button>
          </div>
        </div>
        <div className="table-responsive  mt-1">
          <table className="table select-table">
            <thead>
              <tr>
                <th>
                 index
                </th>
                <th>Product Image</th>
                <th>Ref product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Qte</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcategory.products?.map((p,index)=>{
                return (
                  <tr>
                <td>
                 {index}
                </td>
                <td>
                
                  <div className="d-flex ">
                   
                        <img style={{height:"100px"}} src={"http://localhost:5005/getImage/" + p.image[0]?.name} />

                  </div>
                </td>
                <td>
                  <h6>{p.refProduct} </h6>
                  <h6>{p._id}</h6>
                </td>
                <td>
                    <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                      <p className="text-success">{p.description} </p>
                      
                    </div>
                </td>
                <td><div className="badge badge-opacity-warning">{p.price} </div></td>
                <td><div className="badge badge-opacity-warning">{p.qte} </div></td>

                <td>
                                           
                <ul class="list-inline m-0">
                <li class="list-inline-item">
                <button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i class="fa fa-table"></i></button>
                </li>
                <li class="list-inline-item">
                <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
                </li>
                <li class="list-inline-item">
                <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={()=>ondelete(`${p._id}`)} ><i class="fa fa-trash-o" style={{fontSize:"10px",color:"yellow"}}></i></button>
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
</div>


    </div>
  )
}

export default SubcategoryDetails