import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductService from '../../../services/ProductService';
import Swal from 'sweetalert2'

function UpdateProduct() {
    
  
    
    const [data, setData] = useState({})
    const {id} = useParams()
    const [images, setImages] = useState([])
    const navigate = useNavigate()
  
  
    const onChangehandler = (e) => {
      setData({
        ...data,
        [e.target.name] : e.target.value
      })
      console.log(data)

       }

  
       const onSubmitHandler=(e)=>{
        e.preventDefault()

        const formdata = new FormData()

        for( let i = 0; i<=images.length; i++){
          formdata.append("photos",images[i])
        }
  formdata.append('refProduct',data.refProduct)
  formdata.append('price',data.price)
  formdata.append('description',data.description)
  formdata.append('qte',data.qte)
   
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
   
    if (result.isConfirmed) {
      navigate('/GetAllProducts')
      ProductService.update(id,formdata)
      .then(res=>{
        console.log(res)  
      })
      .catch(err=>{
        console.log(err)
      })
      Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
       
       }  
            useEffect(() => {
              ProductService.get(id).then(res => {
                //console.log("data of Products", res.data.data)
                setData(res.data.data);
              })
          
            },[])
            
            const handleimages = (e)=>{

              setImages(e.target.files)

            }

  return (
    <div>
    
       <div className="page-content-wrap">
  <div className="row">
    <div className="col-md-12">
      <form className="form-horizontal" onSubmit={onSubmitHandler}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><strong>Update</strong> Product</h3>
            <ul className="panel-controls">
              <li><a href="#" className="panel-remove"><span className="fa fa-times" /></a></li>
            </ul>
          </div>
        
          <div className="panel-body">                                                                        
          
            <div className="form-group">
              <label className="col-md-3 col-xs-12 control-label">refProduct</label>
              <div className="col-md-6 col-xs-12">                                            
                <div className="input-group">
                  <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                  <input type="text" className="form-control" id="refProduct" value={data.refProduct} name="refProduct" onChange={onChangehandler}/>
                </div>                                            
                <span className="help-block">Add refProduct</span>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 col-xs-12 control-label">Price</label>
              <div className="col-md-6 col-xs-12">                                            
                <div className="input-group">
                  <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                  <input type="text" className="form-control" id="price" value={data.price} name="price" onChange={onChangehandler}/>
                </div>                                            
                <span className="help-block">Add Price</span>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 col-xs-12 control-label">Qte</label>
              <div className="col-md-6 col-xs-12">                                            
                <div className="input-group">
                  <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                  <input type="text" className="form-control" id="qte" value={data.qte} name="qte" onChange={onChangehandler}/>
                </div>                                            
                <span className="help-block">Add Qte</span>
              </div>
            </div>
           
           

            <div className="form-group">
              <label className="col-md-3 col-xs-12 control-label">Description</label>
              <div className="col-md-6 col-xs-12">                                            
                <div className="input-group">
                  <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                  <input type="text" className="form-control" id="description" value={data.description} name="description" onChange={onChangehandler} />
                </div>                                            
                <span className="help-block">Add Description</span>
              </div>
            </div>
          
          
            <div className="form-group">
              <label className="col-md-3 col-xs-12 control-label">Image</label>
              <div className="col-md-6 col-xs-12">                                                                                                                                        
                <input multiple type="file" id="file" name="galleries" onChange={handleimages} />
                <span className="help-block">Add Image</span>
              </div>
            </div>
           
          </div>
          <div className="panel-footer">
          <Link to="/GetAllProducts" className="btn btn-primary">List of Products</Link>                                  
            <button className="btn btn-primary pull-right" type="submit" >Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>                    
</div>


    </div>
  )
}

export default UpdateProduct