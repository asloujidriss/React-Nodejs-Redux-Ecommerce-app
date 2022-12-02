import React, { useEffect, useState } from 'react'
import Nav from './Nav'

import CategorySevices from '../Services/CategoryServices'
import { Link } from 'react-router-dom';
import Nav1 from './Nav1';
import Nav2 from './Nav2';


const Navbar = () => {

  const [categories,setCategories] = useState([])

  
  useEffect(() => {
   
    CategorySevices.getAll().then(res=>{
      //console.log(res)
      setCategories(res.data.data)
    }).catch(err=>{
      console.log(err)
    })
  }, [])
  
  return (
    <div>
    
    <div className="container-fluid mb-5">
    <div className="row border-top px-xl-5">
    <Nav1/>
      <div className="col-lg-9">
        <Nav2/>
        <Nav/>
      </div>
    </div>
  </div> 
    </div>
  )
}

export default Navbar