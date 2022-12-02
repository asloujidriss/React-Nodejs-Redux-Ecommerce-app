import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link , useParams } from 'react-router-dom'
import Header from '../../components/Header'
import Nav1 from '../../components/Nav1'
import Nav2 from '../../components/Nav2'
import Navbar from '../../components/Navbar'
import TopBar from '../../components/TopBar'
import { addToCart } from '../../Redux/CartRedux'
import SubCategoryService from '../../Services/SubCategoryService'
import { Modal } from 'antd';
import AddForm from '../../components/Buyproduct'

const SubcategoryDetails = () => {
 
    const [subcategory, setSubcategory] = useState({})
   const {id} = useParams()
   const dispatch = useDispatch()



   const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };




   const getdetails =()=>{
    SubCategoryService.getById(id).then(res=>{
        console.log("subdetails",res)
        setSubcategory(res.data.data)
    }).catch(err=>{
        console.log(err)
    })
}
useEffect(() => {
    getdetails()
}, [])
   

  return (
   <div>
    <TopBar/>
    <Header/> 
    <div className="row border-top px-xl-5">
    <Nav1/>
    <Nav2/>
    </div>
 <div className="container-fluid pt-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5"><span className="px-2">{subcategory?.name}</span></h2>
    </div>
    <div className="row px-xl-5 pb-3">
      
      {subcategory?.products?.map(item=>{
        return(
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="card product-item border-0 mb-4">
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          
              <img style={{ height:"300px" }} className="img-fluid w-100" src={"http://localhost:5005/getImage/" + item.image[0].name} alt />
          
          </div>
          <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 className="text-truncate mb-3">{item.refProduct} </h6>
            <div className="d-flex justify-content-center">
              <h6>{item.price} DT</h6>
              {/* <h6 className="text-muted ml-2"><del>{item.price} </del></h6> */}
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between bg-light border">
            <Link to={`/productdetails/${item._id}`}>
            <button href className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1" />View Detail</button>
            </Link>
            <Link to={`/Buyproduct/${item._id}`}>
            <button onClick={showModal} className="btn btn-sm text-dark p-0" ><i className="fas fa-shopping-cart text-primary mr-1"/>Add To Cart</button>
            </Link>
          </div>
        </div>
      </div>     
        )
      })}
     
    </div>
  </div>
     <Modal  title=" Would you like Buy this product " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <AddForm />
      </Modal>
   </div>
  )
}

export default SubcategoryDetails