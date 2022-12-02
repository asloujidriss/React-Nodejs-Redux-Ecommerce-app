import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SubcategoryServices from '../../../services/SubcategoryServices';

const Getsubcategories = () => {

  const navigate = useNavigate()
    const [query, setQuery] = useState("");
    const [subcategories,setSubategories]= useState([])

    const getall =()=>{
        SubcategoryServices.getall().then(res=>{
          console.log("subcat",res)
            setSubategories(res.data.data)
        }).catch(err=>{
          console.log(err)
        })
      }
      useEffect(() => {
        getall()
      }, [])


      const onDelete=(id)=>{
     SubcategoryServices.remove(id).then(res=>{
          getall()
        }).catch(err=>{
          console.log(err)
        })
      }

      useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(`http://localhost:5005/subcategories/byName?q=${query}`);
          setSubategories(res.data);
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
    <h4 style={{display:"flex", alignItems:"center", justifyContent:"center"}} class="card-title"> liste of Subcategories</h4>
    
    <div class="table-responsive pt-3">
      <table class="table">
        <thead>
          <tr>
            <th>
              index
            </th>
            <th>
              name
            </th>
            <th>
             description
            </th>
            <th>
              category
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
         {subcategories.map((item,index)=>{
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
              {item.category?.name}
            </td>
            <td>
              {item.products.map(s=>{
                return (
                  <div style={{display:"flex", flexDirection:"column"}}>
                    <span>{s.refProduct}</span>

                  </div>
                )
              })}
            </td>
            <td>
                                       
                                       <ul style={{display:"flex",alignItems:"center",justifyContent:"center",}} class="list-inline m-0">
                                           <li class="list-inline-item">
                                               <button onClick={()=>navigate(`/subcategorydetails/${item._id}`)} class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i class="fa fa-eye" aria-hidden="true"></i></button>
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

export default Getsubcategories