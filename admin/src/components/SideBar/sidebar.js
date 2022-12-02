import React from 'react'
import { useSelector } from 'react-redux'



const Sidebar= () =>{
  
  const user = JSON.parse(localStorage.getItem("persist:root")) ?
  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user) : ''



  return (

  
    <div>
 <div className="page-sidebar">
      {/* START X-NAVIGATION */}
      <ul className="x-navigation">
        <li className="xn-logo">
          <a href="index.html">IDAS SHOP</a>
          <a href="#" className="x-navigation-control" />
        </li>
        <li className="xn-profile">
          <a href="#" className="profile-mini">
            <img src={"http://localhost:5005/getImage/" + user.currentuser?.data.image } alt="John Doe" />
          </a>
          <div className="profile">
            <div className="profile-image">
              <img src={"http://localhost:5005/getImage/"+ user.currentuser?.data.image } alt="John Doe" />
            </div>
            <div className="profile-data">
              <div className="profile-data-name">{ user.currentuser?.data.firstName} { user.currentuser?.data.lastName} </div>
              <div className="profile-data-title">{user.currentuser?.data.role } </div>
            </div>
            <div className="profile-controls">
              <a href="pages-profile.html" className="profile-control-left"><span className="fa fa-info" /></a>
              <a href="pages-messages.html" className="profile-control-right"><span className="fa fa-envelope" /></a>
            </div>
          </div>                                                                        
        </li>
        <li className="xn-title">Navigation</li>
        <li className="active">
          <a href="/"><span className="fa fa-desktop" /> <span className="xn-text">Dashboard</span></a>                        
        </li>                    
        <li className="xn-openable">
          <a  href="/getusers"><span className="fa fa-files-o" /> <span className="xn-text">Users</span></a>
        
        </li>
        <li className="xn-openable">
          <a href="/getallproducts"><span className="fa fa-file-text-o" /> <span className="xn-text">Products</span></a>
         
        </li>
      
        <li className="xn-openable">
          <a href="/getcategories"><span className="fa fa-cogs" /> <span className="xn-text">Categories</span></a>                        
         
        </li>                    
        <li className="xn-openable">
          <a href="gesubcategories"><span className="fa fa-pencil" /> <span className="xn-text">SubCategories</span></a>
        </li>
        <li className="xn-openable">
          <a href="/GetOrders"><span className="fa fa-file-text-o" /> <span className="xn-text">Orders</span></a>
         
        </li>
        <li className="xn-openable">
          <a href="/GetMyCalendar"><span className="fa fa-table" /> <span className="xn-text">Calendar</span></a> 
        </li>
        

        <li className="xn-openable">
          <a href="#"><span className="fa fa-bar-chart-o" /> <span className="xn-text">Charts</span></a>
          <ul>
            <li><a href="charts-morris.html"><span className="xn-text">Morris</span></a></li>
            <li><a href="charts-nvd3.html"><span className="xn-text">NVD3</span></a></li>
            <li><a href="charts-rickshaw.html"><span className="xn-text">Rickshaw</span></a></li>
            <li><a href="charts-other.html"><span className="xn-text">Other</span></a></li>
          </ul>
        </li>                    
        <li>
          <a href="maps.html"><span className="fa fa-map-marker" /> <span className="xn-text">Maps</span></a>
        </li>                    
        <li className="xn-openable">
          <a href="#"><span className="fa fa-sitemap" /> <span className="xn-text">Navigation Levels</span></a>
          <ul>                            
            <li className="xn-openable">
              <a href="#">Second Level</a>
              <ul>
                <li className="xn-openable">
                  <a href="#">Third Level</a>
                  <ul>
                    <li className="xn-openable">
                      <a href="#">Fourth Level</a>
                      <ul>
                        <li><a href="#">Fifth Level</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>                            
          </ul>
        </li>
      </ul>
      {/* END X-NAVIGATION */}
    </div>

    </div>
  )
}

export default Sidebar;