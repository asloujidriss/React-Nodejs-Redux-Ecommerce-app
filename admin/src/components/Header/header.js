import React from 'react'
import { Link } from "react-router-dom"
import Logout from '../../views/auth/Logout/Logout'

function Header() {
  return (
    <>
          <ul className="x-navigation x-navigation-horizontal x-navigation-panel">
       
        <li className="xn-icon-button">
          <a href="#" className="x-navigation-minimize"><span className="fa fa-dedent" /></a>
        </li>
      
        <Logout/>
        <li className="xn-icon-button pull-right">
          <a href="#"><span className="fa fa-comments" /></a>
          <div className="informer informer-danger">4</div>
          <div className="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
            <div className="panel-heading">
              <h3 className="panel-title"><span className="fa fa-comments" /> Messages</h3>                                
              <div className="pull-right">
                <span className="label label-danger">4 new</span>
              </div>
            </div>
            <div className="panel-body list-group list-group-contacts scroll" style={{height: 200}}>
              <a href="#" className="list-group-item">
                <div className="list-group-status status-online" />
                <img src="assets/images/users/user2.jpg" className="pull-left" alt="John Doe" />
                <span className="contacts-title">John Doe</span>
                <p>Praesent placerat tellus id augue condimentum</p>
              </a>
              <a href="#" className="list-group-item">
                <div className="list-group-status status-away" />
                <img src="assets/images/users/user.jpg" className="pull-left" alt="Dmitry Ivaniuk" />
                <span className="contacts-title">Dmitry Ivaniuk</span>
                <p>Donec risus sapien, sagittis et magna quis</p>
              </a>
              <a href="#" className="list-group-item">
                <div className="list-group-status status-away" />
                <img src="assets/images/users/user3.jpg" className="pull-left" alt="Nadia Ali" />
                <span className="contacts-title">Nadia Ali</span>
                <p>Mauris vel eros ut nunc rhoncus cursus sed</p>
              </a>
              <a href="#" className="list-group-item">
                <div className="list-group-status status-offline" />
                <img src="assets/images/users/user6.jpg" className="pull-left" alt="Darth Vader" />
                <span className="contacts-title">Darth Vader</span>
                <p>I want my money back!</p>
              </a>
            </div>     
            <div className="panel-footer text-center">
              <a href="pages-messages.html">Show all messages</a>
            </div>                            
          </div>                        
        </li>
        {/* END MESSAGES */}
        {/* TASKS */}
        <li className="xn-icon-button pull-right">
          <a href="#"><span className="fa fa-tasks" /></a>
          <div className="informer informer-warning">3</div>
          <div className="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
            <div className="panel-heading">
              <h3 className="panel-title"><span className="fa fa-tasks" /> Tasks</h3>                                
              <div className="pull-right">
                <span className="label label-warning">3 active</span>
              </div>
            </div>
            <div className="panel-body list-group scroll" style={{height: 200}}>                                
              <a className="list-group-item" href="#">
                <strong>Phasellus augue arcu, elementum</strong>
                <div className="progress progress-small progress-striped active">
                  <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '50%'}}>50%</div>
                </div>
                <small className="text-muted">John Doe, 25 Sep 2014 / 50%</small>
              </a>
              <a className="list-group-item" href="#">
                <strong>Aenean ac cursus</strong>
                <div className="progress progress-small progress-striped active">
                  <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{width: '80%'}}>80%</div>
                </div>
                <small className="text-muted">Dmitry Ivaniuk, 24 Sep 2014 / 80%</small>
              </a>
              <a className="list-group-item" href="#">
                <strong>Lorem ipsum dolor</strong>
                <div className="progress progress-small progress-striped active">
                  <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} style={{width: '95%'}}>95%</div>
                </div>
                <small className="text-muted">John Doe, 23 Sep 2014 / 95%</small>
              </a>
              <a className="list-group-item" href="#">
                <strong>Cras suscipit ac quam at tincidunt.</strong>
                <div className="progress progress-small">
                  <div className="progress-bar" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}}>100%</div>
                </div>
                <small className="text-muted">John Doe, 21 Sep 2014 /</small><small className="text-success"> Done</small>
              </a>                                
            </div>     
            <div className="panel-footer text-center">
              <a href="pages-tasks.html">Show all tasks</a>
            </div>                            
          </div>                        
        </li>
        {/* END TASKS */}
      </ul>
    </>

  )
}

export default Header