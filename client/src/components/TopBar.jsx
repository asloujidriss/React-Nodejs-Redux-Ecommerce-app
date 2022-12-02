import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SignOut } from '../Redux/UserRedux'

const TopBar = () => {

  const user = useSelector(state=> state.user.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = ()=>{

   dispatch(SignOut())
    navigate('/login')
}



  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light ">

  <div className="container-fluid ">

    <div  className="collapse navbar-collapse d-flex flex-row-reverse bg-secondary pe-4" id="navbarNavDropdown">
      <ul className="navbar-nav ">
        {user ? 
          <li className="dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img style={{ height:"40px"}} src={"http://localhost:5005/getImage/"+ user.image } className="rounded-circle"  />
          </a>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item " href="#">Profil</a></li>
            <li><a className="dropdown-item " href="/myorder">My order</a></li>
            <li><a className="dropdown-item " onClick={handleLogout} >SignOut</a></li>
          </ul>
        </li> 
         :
         <>
       <li className="nav-item">
         <a className="nav-link" href="/login">Login</a>
       </li>
         <li className="nav-item">
         <a className="nav-link" href="/register">Register</a>
       </li>
       </>
         }
      
      
       
      </ul>
    </div>
  </div>
 
</nav>



  )
}

export default TopBar