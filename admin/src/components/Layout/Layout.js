import React, { useEffect, useState } from 'react'
import UsersService from '../../services/UsersService'
import OrderServices from '../../services/OrdersServices';
import DemoPie from '../Chart'
import DemoLine from '../UserChart'
import IncomeChart from '../IncomeChart'

function Layout() {
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])

  const getall = ()=>{
    UsersService.getAll().then(res=>{
        setUsers(res.data.data)
    })
}
const getAll =()=>{
  OrderServices.getorders()?.then(res=>{

    setOrders(res.data.data)
  }).catch(err=>{
    console.log(err)
  })
}


useEffect(() => {
   getall()
   getAll()
    },[])
 

  return (

    <div>
<ul className="breadcrumb">
        <li><a href="#">Home</a></li>                    
        <li className="active">Dashboard</li>
      </ul>
    
      <div className="page-content-wrap">
                    
        <div className="row">
          <div className="col-md-3">
        
            <div className="widget widget-default widget-carousel">
              <div className="owl-carousel" id="owl-example">
                <div>                                    
                  <div className="widget-title">Total Orders</div>                                                                        
                  <div className="widget-subtitle">{new Date().toLocaleDateString()} </div>
                  <div className="widget-int">{orders.length}</div>
                </div>
              </div>                            
              <div className="widget-controls">                                
                <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
              </div>                             
            </div>         
          </div>
          <div className="col-md-3">
      
            <div className="widget widget-default widget-item-icon" onclick="location.href='pages-messages.html';">
              <div className="widget-item-left">
                <span className="fa fa-envelope" />
              </div>                             
              <div className="widget-data">
                <div className="widget-int num-count">48</div>
                <div className="widget-title">New messages</div>
                <div className="widget-subtitle">In your mailbox</div>
              </div>      
              <div className="widget-controls">                                
                <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
              </div>
            </div>                            
          
          </div>
          <div className="col-md-3">
           
            <div className="widget widget-default widget-item-icon" onclick="location.href='pages-address-book.html';">
              <div className="widget-item-left">
                <span className="fa fa-user" />
              </div>
              <div className="widget-data">
                <div className="widget-int num-count">{users.length} </div>
                {/* {Object.keys(users).length} */}
                <div className="widget-title">Registred users</div>
                <div className="widget-subtitle">On your website</div>
              </div>
              <div className="widget-controls">                                
                <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
              </div>                            
            </div>                            
           
          </div>
          <div className="col-md-3">
     
            <div className="widget widget-info widget-padding-sm">
              <div className="widget-big-int plugin-clock">00:00</div>                            
              <div className="widget-subtitle plugin-date">Loading...</div>
              <div className="widget-controls">                                
                <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="left" title="Remove Widget"><span className="fa fa-times" /></a>
              </div>                            
              <div className="widget-buttons widget-c3">
                <div className="col">
                  <a href="#"><span className="fa fa-clock-o" /></a>
                </div>
                <div className="col">
                  <a href="#"><span className="fa fa-bell" /></a>
                </div>
                <div className="col">
                  <a href="/GetMyCalendar"><span className="fa fa-calendar" /></a>
                </div>
              </div>                            
            </div>                        
           
          </div>
        </div>
                  
        
        <div className="row">
          <div className="col-md-8">
            {/* START SALES BLOCK */}
            <div className="panel panel-default">
             <DemoLine/>
            
            </div>
       
          </div>
          <div className="common-modal modal fade" id="common-Modal1" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-content">
              <ul className="list-inline item-details">
                <li><a href="http://themifycloud.com/downloads/janux-premium-responsive-bootstrap-admin-dashboard-template/">Admin templates</a></li>
                <li><a href="http://themescloud.org">Bootstrap themes</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
       
            <div className="panel panel-default">
                <DemoPie/>
            </div>
      
          </div>
        </div>

        <div  className="col-md-8">
      
            <div  className="panel panel-default">
             <IncomeChart/>
            
            </div>
          
          </div>


        <div className="chart-holder" id="dashboard-area-1" style={{height: 200}} />
        <div className="block-full-width">
        </div>                    

      </div> 

    </div>
  )
}

export default Layout