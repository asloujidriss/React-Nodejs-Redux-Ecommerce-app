import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CalendarService from '../../../services/CalendarService';

const GetMyCalendar = () => {
    
    const navigate = useNavigate()
    const [query, setQuery] = useState("");
    const [calendars, setCalendars] = useState([])

    const getall =()=>{
        CalendarService.getall().then(res=>{
       
          setCalendars(res.data.data)
        }).catch(err=>{
          console.log(err)
        })
      }
      useEffect(() => {
        getall()
      }, [])
      const onDelete=(id)=>{
        CalendarService.remove(id).then(res=>{
             getall()
           }).catch(err=>{
             console.log(err)
           })
         }



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
    <div>
    <h4 style={{display:"flex", alignItems:"center", justifyContent:"center"}}  class="card-title">Your appointements</h4>
    <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}} >
    <button onClick={()=>navigate('/calendar')} style={{height:"50px",width:"200px",borderRadius:"5%", marginRight:"10px"}}
                                     type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                      Add Appointement
                                     </button>
    </div>
    </div>
    
    <div class="table-responsive pt-3">
      <table class="table">
        <thead>
          <tr>
            <th>
              index
            </th>
            <th>
              event
            </th>
            <th>
             StartDate
            </th>
            <th>
              EndDate
            </th>
            <th width="125px">
              action
            </th>
          </tr>
        </thead>
        <tbody>
         {calendars.map((item,index)=>{
          return (
            <tr>
            <td>
              {index}
            </td>
            <td>
              {item.event}
            </td>
            <td>
              {item.Start}
            </td>
            <td>
              {item.End}
            </td>
            

            <td>
                                       
                                       <ul style={{display:"flex",alignItems:"center",justifyContent:"center",}} class="list-inline m-0">
                                          
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

export default GetMyCalendar
