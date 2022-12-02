import React, { useEffect, useState } from 'react'
import ProductServices from '../Services/ProductServices'
import {useDispatch} from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import SubCategoryService from '../Services/SubCategoryService'


const Container = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [products,setProducts] = useState([])
  const [errors,setErrors]= useState("")
  const [subCategories, setSubcategories] = useState([])


  const getAll =()=>{

    SubCategoryService.getAll().then(res=>{
      //console.log(res)
      setSubcategories(res.data.data)
    }).catch(err=>{
      console.log(err)
     
    })
  } 


const getall =()=>{
  ProductServices.getAll().then(res=>{
    //console.log(res)
    setProducts(res.data.data)
  }).catch(err=>{
    console.log(err)
   
  })
}




useEffect(() => {
  getall()
  getAll()
}, [])



  return (
    <div>
  <div className="container-fluid pt-5">
    <div className="row px-xl-5 pb-3">
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="d-flex align-items-center border mb-4" style={{padding: 30}}>
          <h1 className="fa fa-check text-primary m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="d-flex align-items-center border mb-4" style={{padding: 30}}>
          <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
          <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="d-flex align-items-center border mb-4" style={{padding: 30}}>
          <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="d-flex align-items-center border mb-4" style={{padding: 30}}>
          <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
        </div>
      </div>
    </div>
  </div>

  <div className="container-fluid pt-5">
    <div className="row px-xl-5 pb-3">
      {subCategories?.map((item,index)=>{
        return (
          <div  className="col-lg-4 col-md-6 pb-1">
        <div  key={index} className="cat-item d-flex flex-column border mb-4" style={{padding: 30}}>
          <p style={{display:"flex",alignItems:"center", justifyContent:"center"}} className="font-weight-semi-bold m-0">{item.products.length} products available </p>
            <img style={{height:"300px"}} className="img-fluid" src={"http://localhost:5005/getImage/"+ item.products[0]?.image[0]?.name } alt />
          <a onClick={()=>navigate(`/subcategorydetails/${item._id}`)} className="btn btn-outline-primary py-md-2 px-md-3">
            Show More</a>
          <h5 style={{display:"flex",alignItems:"center", justifyContent:"center", color:"red"}} className="font-weight-semi-bold m-0">{item.name} </h5>
        </div>
      </div>
        )
      })}
    
    </div>
  </div>

  <div className="container-fluid offer pt-5">
    <div className="row px-xl-5">
      <div className="col-md-6 pb-4">
        <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
          <img src="img/offer-1.png" alt />
          <div className="position-relative" style={{zIndex: 1}}>
            <h5 className="text-uppercase text-primary mb-3">20% off the all order</h5>
            <h1 className="mb-4 font-weight-semi-bold">Spring Collection</h1>
            <a href className="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
          </div>
        </div>
      </div>
      <div className="col-md-6 pb-4">
        <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
          <img src="img/offer-2.png" alt />
          <div className="position-relative" style={{zIndex: 1}}>
            <h5 className="text-uppercase text-primary mb-3">20% off the all order</h5>
            <h1 className="mb-4 font-weight-semi-bold">Winter Collection</h1>
            <a href className="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="container-fluid pt-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5"><span className="px-2">Trandy Products</span></h2>
    </div>
    <div className="row px-xl-5 pb-3">
      
      {products?.map(item=>{
        return(
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="card product-item border-0 mb-4">
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          
              <img style={{ height:"300px" }} className="img-fluid w-100" src={"http://localhost:5005/getImage/" + item.image[0].name} alt />
          
          </div>
          <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 className="text-truncate mb-3">{item.refProduct} </h6>
            <div className="d-flex justify-content-center">
              <h6>{item.price}</h6><h6 className="text-muted ml-2"><del>{item.price}</del></h6>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between bg-light border">
            <Link to={`/productdetails/${item._id}`}>
            <button href className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1" />View Detail</button>
            </Link>
            {/* <button href className="btn btn-sm text-dark p-0" onClick={()=>dispatch(addToCart({item}))}><i className="fas fa-shopping-cart text-primary mr-1"/>Add To Cart</button> */}
          </div>
        </div>
      </div>
        )
      })}
     
    </div>
  </div>
  


  <div className="container-fluid py-5">
    <div className="row px-xl-5">
      <div className="col">
        <div className="owl-carousel vendor-carousel">
          <div className="vendor-item border p-4">
            <img src="img/vendor-1.jpg" alt />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-2.jpg" alt />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-3.jpg" alt />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-4.jpg" alt />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-5.jpg" alt />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-6.jpg" alt />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-7.jpg" alt />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-8.jpg" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
 
</div>

    
  )
}

export default Container