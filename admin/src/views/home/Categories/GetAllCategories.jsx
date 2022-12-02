import React from 'react'
import './getallcategories.css'

import { useState,useEffect } from 'react'
import CategorySevices from '../../../services/CategoryService'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function GetAllCategories() {
const [query, setQuery] = useState("");
const [categories,setCategories]= useState([])

const navigate = useNavigate()

const getall =()=>{
  CategorySevices.getAll().then(res=>{
    setCategories(res.data.data)
  }).catch(err=>{
    console.log(err)
  })
}

useEffect(() => {
  getall()
}, [])

const onDelete=(id)=>{

  CategorySevices.remove(id).then(res=>{
    getall()
  }).catch(err=>{
    console.log(err)
  })
}

useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:5005/categories/categorybyname?q=${query}`);
    setCategories(res.data);
  };
  if (query.length === 0 || query.length > 1)
    fetchData();
}, [query]);




  return (
    <div>
      <div class="col-lg-12 grid-margin stretch-card">


    <li className="search">
          <form role="form">
            <input onChange={(e) => setQuery(e.target.value.toLowerCase())} type="text"  placeholder="Search..." />
          </form>
        </li>



    <div class="card">
      <div class="card-body">
        <h4 style={{display:"flex", alignItems:"center", justifyContent:"center"}} class="card-title"> liste of categories</h4>
        
        <div class="table-responsive pt-3">
          <table class="table table-dark">
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  name
                </th>
                <th>
                 description
                </th>
                <th>
                  subCategories
                </th>
                <th width="125px">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
             {categories.map((item,index)=>{
              return (
                <tr>
                <td>
                  {index}
                </td>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.description}
                </td>
                <td>
                  {item.subCategories.map(s=>{
                    return (
                      <div style={{display:"flex", flexDirection:"column"}}>
                        <span>{s.name}</span>

                      </div>
                    )
                  })}
                </td>
                <td>
                                           
                                           <ul style={{display:"flex",alignItems:"center",justifyContent:"center",}} class="list-inline m-0">
                                               <li class="list-inline-item">
                                                   <button onClick={()=>navigate("/addcategory")} class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i class="fa fa-eye" aria-hidden="true"></i></button>
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
  </div>
  )
}

export default GetAllCategories