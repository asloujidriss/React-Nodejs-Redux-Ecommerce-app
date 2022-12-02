
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import Pagination from '../../../components/PaginationUser'

import UsersService from '../../../services/UsersService'
import AddForm from "../../../components/AddFormUser";
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import { Button, Modal } from 'antd';

const GetAllUsers = () => {


  const navigate = useNavigate()
  
    const [show, setShow] = useState(false);
    const [message, setMessage]= useState("")

    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([])
   
    


const sortedUsers =users.sort((a,b)=>(a.firstName < b.firstName ? -1 : 1 ))



const [isModalOpen, setIsModalOpen] = useState(false);

const showModal = () => {
  setIsModalOpen(true);
};

const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
};


const getAll = ()=>{
    UsersService.getAll().then(res=>{
       console.log(res)
        setUsers(res.data.data)
    })
}

useEffect(() => {
   getAll()
  
   
    },[])

 const onDelete=(id)=>{

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            UsersService.remove(id).then(res=>{
                getAll()
                setMessage(res.data.message)
                setShow(true)
                  setTimeout(() => {
                    setShow(false)
                  }, 5000);  

            }).catch(err=>{
                if(err.response && err.response.status>= 400){
                    setMessage(err.response.data.message)
                    setShow(true)
                    setTimeout(() => {
                      setShow(false)
                    }, 5000);
                }
                console.log(err)

            })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

 }   

 useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:5005/clients/getbyName?q=${query}`);
    //console.log(res)
    setUsers(res.data);
  };
  if (query.length === 0 || query.length > 1)
    fetchData();
}, [query]);

 const [currentPage, setCurrentPage] = useState(1);
 const [usersPerPage] = useState(2)

 const indexOfLastUser = currentPage * usersPerPage;
 const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPagesNum = Math.ceil(sortedUsers.length / usersPerPage);
 

  return (
    <div>
          <div class="alert alert-info" role="alert" style={{display: show ? "block": "none",
            fontSize:"20px", color:"white",backgroundColor:"red",paddingLeft:"450px" }}>
        {message}
          </div>
          <li className="search">
          <form role="form">
            <input name="q" onChange={(e) => setQuery(e.target.value.toLowerCase())} type="text"  placeholder="Search..." />
          </form>
        </li>
       
 <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                
                                
                                <div style={{display:"flex",justifyContent:"flex-end"}} >
                                <div  class="panel-heading">
                                    <h3 class="panel-title">List of Users</h3>
                                </div>

                                    <button onClick={showModal} style={{height:"50px",width:"200px",borderRadius:"5%", marginRight:"10px"}}
                                     type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                      Add New User
                                     </button>
                                </div>
                                  

                                <div class="panel-body panel-body-table">

                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped table-actions">
                                            <thead>
                                                <tr>
                                                    <th width="50">id</th>
                                                    <th>FirstName</th>
                                                    <th width="100">LastName</th>
                                                    <th width="100">Email</th>
                                                    <th width="100">Tel</th>
                                                    <th width="100">Photo</th>
                                                    <th width="100">adressL</th>
                                                    <th width="100">actions</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                           
                                                {currentUsers.map((item,index)=>{ 
                                                    return(                                         
                                                <tr id="trow_1">
                                                    <td class="text-center">{index}</td>
                                                    <td><strong>{item.firstName}</strong></td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.tel}</td>
                                                
                                                    
                                                    <td>{item.image && (
                                                        <img style={ { height:"100px" } } src= {"http://localhost:5005/getImage/"+ item.image}/>
                                                  )}</td>
                                                
                                                    
                                                    
                                                    <td>{item.addressL}</td>
                                                    <td>
                                                    <OverlayTrigger
    
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>Edit User</strong>.
            </Tooltip>
          }
        >
              { <button onClick={()=>navigate(`/UpDateUser/${item._id}`)} class="btn btn-default btn-rounded btn-sm"><span class="fa fa-pencil"></span></button>}
        </OverlayTrigger>
        <OverlayTrigger
    
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>Delete User</strong>.
            </Tooltip>
          }
        >
             <button class="btn btn-danger btn-rounded btn-sm" onClick={(e)=> onDelete(item._id)}><span class="fa fa-times"></span></button>
        </OverlayTrigger>                    
                                                    </td>
                                                </tr>
                                                )  
                                                })}
                                            </tbody>
                                        </table>
                                        <Pagination  pages ={totalPagesNum}
                                                     setCurrentPage={setCurrentPage}
                                                     currentUsers ={currentUsers}
                                                      sortedUsers = {sortedUsers}
                                                     />    
                                    </div>                                
                                </div>
                            </div>                                                

                        </div>
                    </div>


                    
      <Modal title="Add New User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <AddForm />
      </Modal>
              

    </div>

  )


}

export default GetAllUsers