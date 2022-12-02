import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { SignOut } from '../../../Redux/UserRedux'

function Logout() {

const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = ()=>{

   dispatch(SignOut())
    // navigate('/login')
  
}

  return (
  

    <div>
    <li className="xn-icon-button pull-right">
   <a href="#" className="mb-control" data-box="#mb-signout" ><span className="fa fa-sign-out" /></a> 

   { <div className="message-box animated fadeIn" data-sound="alert" id="mb-signout">
     <div className="mb-container">
         <div className="mb-middle">
             <div className="mb-title"><span className="fa fa-sign-out"></span> Log <strong>Out</strong> ?</div>
             <div className="mb-content">
                 <p>Are you sure you want to log out?</p>                    
                 <p>Press No if youwant to continue work. Press Yes to logout current user.</p>
             </div>
             <div className="mb-footer">
                 <div className="pull-right">
                     {/* <Link to="/Login"> */}
                     <button className="btn btn-success btn-lg" onClick={()=>{handleLogout(); navigate("/login")}}
                     >Yes</button>
                     {/* </Link> */}
                     <button className="btn btn-default btn-lg mb-control-close">No</button>
                 </div>
             </div>
         </div>
     </div>
 </div> }
  <audio id="audio-alert" src="audio/alert.mp3" preload="auto"></audio>
 <audio id="audio-fail" src="audio/fail.mp3" preload="auto"></audio>                   
 </li> 
</div>
  )
}

export default Logout