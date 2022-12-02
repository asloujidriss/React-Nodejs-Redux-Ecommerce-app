
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryServices from '../Services/CategoryServices'

const Nav1 = () => {
  const navigate = useNavigate()
  const [catgeories, setCategories] = useState([])
  const getall =()=>{
    CategoryServices.getAll().then(res=>{
      setCategories(res.data.data)
    }).catch(err=>{
      console.log(err)
    })
  }
  useEffect(() => {
    getall()
  }, [])

  const refreshPage = ()=>{
    window.location.reload();
 }


  return (
  <div className="col-lg-3 d-none d-lg-block">
  <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: 65, marginTop: '-1px', padding: '0 30px'}}>
    <h6 className="m-0">Categories</h6>
    <i className="fa fa-angle-down text-dark" />
  </a>
  <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
    <div className="navbar-nav w-100 overflow-hidden" style={{height: 410}}>
      {catgeories.map((item,index)=>{
        return (
          <div key={index} className="nav-item dropdown">
        <a href="#" className="nav-link" data-toggle="dropdown"><strong>{item.name}</strong><i className="fa fa-angle-down float-right mt-1" /></a>
        <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
          {item.subCategories.map((s)=>{
            return(
              <a onClick={()=>{navigate(`/subcategorydetails/${s._id}`);refreshPage()}} className="dropdown-item">{s.name}</a>

            )
          })}
          
        </div>
      </div>
        )
      })}
     
    </div>
  </nav>
</div>

  )
}

export default Nav1