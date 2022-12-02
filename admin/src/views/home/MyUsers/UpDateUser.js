import React, { useState, useEffect } from 'react'
import { Link, useParams,useNavigate} from 'react-router-dom'

import UsersService from '../../../services/UsersService'
import Swal from 'sweetalert2'

const UpDateUser = () => {

  const [data, setData]= useState({})
  const {id} = useParams()
  const [image, setImage] = useState({})
  const navigate = useNavigate()


const onChangehandler=(e)=>{
setData({
  ...data,
  [e.target.name] : e.target.value
})
}

const onSubmithandler=(e)=>{
e.preventDefault()

const formdata = new FormData()

formdata.append('photo',image)
formdata.append('firstName',data.firstName)
formdata.append('lastName',data.lastName)
formdata.append('email',data.email)
formdata.append('tel',data.tel)
formdata.append('adressL',data.adressL)


Swal.fire({
  title: 'Do you wanv to save the changes?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: `Don't save`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    UsersService.update(id,formdata)
    .then(res=>{
   
      setData(res.data.data)
      navigate('/GetUsers')
    }).catch(err=>{
      console.log(err)
    })
    Swal.fire('Saved!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})
}
useEffect(() => {
  UsersService.get(id).then(res => {
    
    setData(res.data.data);
  })

},[]) 

const handleimage=(e)=>{
  console.log(e)
  setImage(e.target.files[0])
}


  return (
    
    <div>
      
    <div className="page-content-wrap">
<div className="row">
<div className="col-md-12">
  <form className="form-horizontal" onSubmit={onSubmithandler} >
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title"><strong>Update</strong> User</h3>
        <ul className="panel-controls">
          <li><a href="#" className="panel-remove"><span className="fa fa-times" /></a></li>
        </ul>
      </div>
     
      <div className="panel-body">                                                                        
        <div className="form-group">
          <label className="col-md-3 col-xs-12 control-label">FirstName</label>
          <div className="col-md-6 col-xs-12">                                            
            <div className="input-group">
              <span className="input-group-addon"><span className="fa fa-pencil" /></span>
              <input type="text" className="form-control" value={data.firstName} name="firstName" onChange={onChangehandler} />
            </div>                                           
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-3 col-xs-12 control-label">LastName</label>
          <div className="col-md-6 col-xs-12">                                            
            <div className="input-group">
              <span className="input-group-addon"><span className="fa fa-pencil" /></span>
              <input type="text" className="form-control" value={data.lastName} name="lastName" onChange={onChangehandler} />
            </div>                                            
           
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-3 col-xs-12 control-label">Email</label>
          <div className="col-md-6 col-xs-12">                                            
            <div className="input-group">
              <span className="input-group-addon"><span className="fa fa-pencil" /></span>
              <input type="text" className="form-control" value={data.email} name="email" onChange={onChangehandler}/>
            </div>                                            
           
          </div>
        </div>
        {/* <div className="form-group">
          <label className="col-md-3 col-xs-12 control-label">Password</label>
          <div className="col-md-6 col-xs-12">                                            
            <div className="input-group">
              <span className="input-group-addon"><span className="fa fa-pencil" /></span>
              <input type="password" className="form-control" value={data.password}  name="password" onChange={onChangehandler}/>
            </div>                                            
           
          </div>
        </div> */}
        <div className="form-group">
          <label className="col-md-3 col-xs-12 control-label">Tel</label>
          <div className="col-md-6 col-xs-12">                                            
            <div className="input-group">
              <span className="input-group-addon"><span className="fa fa-pencil" /></span>
              <input type="text" className="form-control" value={data.tel} name="tel" onChange={onChangehandler}/>
            </div>                                            
            
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-3 col-xs-12 control-label">AdressL</label>
          <div className="col-md-6 col-xs-12">                                            
            <div className="input-group">
              <span className="input-group-addon"><span className="fa fa-pencil" /></span>
              <input type="text" className="form-control" value={data.adressL} name="adressL" onChange={onChangehandler} />
            </div>                                            
            
          </div>
        </div>      
        <div className="form-group">
          <label className="col-md-3 col-xs-12 control-label">File</label>
          <div className="col-md-6 col-xs-12">                                                                                                                                        
            <input type="file" className="fileinput btn-primary" value={data.data?.image} name="image" onChange={handleimage} />
        
          </div>
        </div>
       
      </div>
      <div className="panel-footer">
        <button className="btn btn-default">Clear Form</button>
       
        <Link to="/GetUsers" className="btn btn-primary">List of Users</Link> 
                                           
        <button className="btn btn-primary pull-right" type="submit">Submit</button>
      </div>
    </div>
  </form>
</div>
</div>                    
</div>

</div>

   
  )
}

export default UpDateUser