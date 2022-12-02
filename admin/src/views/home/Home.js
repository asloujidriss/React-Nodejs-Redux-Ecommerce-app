import React from 'react'
import Header from '../../components/Header/header'

import Sidebar from '../../components/SideBar/sidebar'

import { Outlet } from "react-router-dom";

function Home() {
  return (
  <div>
 
  <div className="page-container">

    <Sidebar/>

    <div className="page-content">
    <Header/>
 
 <Outlet></Outlet>
                                   
    </div>            
  
  </div>

</div>

  )
}

export default Home