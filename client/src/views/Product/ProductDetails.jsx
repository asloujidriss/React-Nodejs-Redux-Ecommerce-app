
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Nav1 from '../../components/Nav1'
import Nav2 from '../../components/Nav2'
import  {addToCart} from '../../Redux/CartRedux'
import ProductServices from '../../Services/ProductServices'
import {useDispatch} from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Radio } from 'antd';
import TopBar from '../../components/TopBar'
import { Modal } from 'antd';
import AddForm from '../../components/Buyproduct'

const ProductDetails = () => {

   const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const [size, setSize] = useState(1);
    const [color, setColor] = useState(1);
    const [product,setProduct] = useState({})
    
    const [quantity,setQuantity] = useState(1)
    

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
   

    const onChangeSize = (e) => {
      //console.log('radio checked', e.target.value);
      setSize(e.target.value);
    };
    const onChangeColor = (e) => {
      //console.log('radio checked', e.target.value);
      setColor(e.target.value);
    };
    
        const getproduct=()=>{
            ProductServices.getOne(id).then(res=>{
                console.log(res)
                setProduct(res.data.data)
            }).catch(err=>{
                console.log(err)
           
             
            })
        }
        useEffect(() => {
            getproduct()
        }, [])
        
        const handleQuantity= (type) =>{
            if(type === "dec"){
             quantity > 1 && setQuantity(quantity -1)
            }else{
              setQuantity(quantity +1)
            }
            
            }
            const addtocart=()=>{

                dispatch(addToCart({product,quantity,color,size}))
               
            }  


            const refreshPage = ()=>{
              window.location.reload();
           }

  return (
      <div>
        <TopBar/>
         <Header/>   
    <div className="row border-top px-xl-5">
    <Nav1/>
        <Nav2/>
    </div>
 
  <div className="container-fluid bg-secondary mb-5">
    <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
      <div className="d-inline-flex">
        <p className="m-0"><a href>Home</a></p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Shop Detail</p>
      </div>
    </div>
  </div>
  {/* Page Header End */}
  {/* Shop Detail Start */}
  <div className="container-fluid py-5">
    <div className="row px-xl-5">
      <div className="col-lg-5 pb-5">
        <div id="product-carousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner border">
          {product.image?.map(img=>{
              return(
                <div key={img._id} className="carousel-item active">
            
                <img className="w-100 h-100" src={"http://localhost:5005/getImage/"+ img?.name} alt="Image" />
              </div>
              )
            })}
            {/* <div className="carousel-item">
              <img className="w-100 h-100" src={"http://localhost:5005/getImage/" + product?.image[1]?.name} alt="Image" />
            </div>
            <div className="carousel-item">
              <img className="w-100 h-100" src={"http://localhost:5005/getImage/" + product?.image[2]?.name} alt="Image" />
            </div>
            <div className="carousel-item">
              <img className="w-100 h-100" src={"http://localhost:5005/getImage/" + product?.image[3]?.name} alt="Image" />
            </div> */}
          </div>
          <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
            <i className="fa fa-2x fa-angle-left text-dark" />
          </a>
          <a className="carousel-control-next" href="#product-carousel" data-slide="next">
            <i className="fa fa-2x fa-angle-right text-dark" />
          </a>
        </div>
      </div>
      <div className="col-lg-7 pb-5">
        <h3 className="font-weight-semi-bold">{product.refProduct}</h3>
        <div className="d-flex mb-3">
          <div className="text-primary mr-2">
            <small className="fas fa-star" />
            <small className="fas fa-star" />
            <small className="fas fa-star" />
            <small className="fas fa-star-half-alt" />
            <small className="far fa-star" />
          </div>
          <small className="pt-1">(50 Reviews)</small>
        </div>
        <h3 className="font-weight-semi-bold mb-4">{product.price}</h3>
        <p className="mb-4">{product.description}</p>
        

        <div className="d-flex mb-3">
          <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
          <Radio.Group  onChange={onChangeSize} value={size}>
      
        <Radio style={{marginLeft:"30px"}} value={1}>XS</Radio>
        <Radio style={{marginLeft:"40px"}}  value={2}>S</Radio>
        <Radio style={{marginLeft:"40px"}}  value={3}>M</Radio>
        <Radio style={{marginLeft:"40px"}}  value={4}>L</Radio>
        <Radio style={{marginLeft:"40px"}}  value={5}>XL</Radio>
        </Radio.Group>
         
        </div>
        <div className="d-flex mb-4">
          <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
          <Radio.Group style={{display:"flex", justifyContent:"space-Between"}} onChange={onChangeColor} value={color}>
        
        <Radio style={{marginLeft:"20px"}} value={1}>White</Radio>
        <Radio style={{marginLeft:"20px"}} value={2}>Black</Radio>
        <Radio style={{marginLeft:"20px"}} value={3}>Red</Radio>
        <Radio style={{marginLeft:"20px"}} value={4}>Blue</Radio>
        <Radio style={{marginLeft:"20px"}} value={5}>Yellow</Radio>
        <Radio style={{marginLeft:"20px"}} value={6}>Green</Radio>
         </Radio.Group>
         
        </div>
        <div className="d-flex align-items-center mb-4 pt-2">
          <div className="input-group quantity mr-3" style={{width: 130}}>
            <div className="input-group-btn">
              <button className="btn btn-primary btn-minus" onClick={()=>handleQuantity("dec")} >
                <i className="fa fa-minus" />
              </button>
            </div>
            <input type="text" className="form-control bg-secondary text-center" value={quantity} />
            <div className="input-group-btn">
              <button className="btn btn-primary btn-plus" onClick={()=> handleQuantity("inc")}>
                <i className="fa fa-plus" />
              </button>
            </div>
          </div>
          <button className="btn btn-primary px-3" onClick={addtocart} ><i className="fa fa-shopping-cart mr-1" /> Add To Cart</button>
        </div>
        <div className="d-flex pt-2">
          <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
          <div className="d-inline-flex">
            <a className="text-dark px-2" href>
              <i className="fab fa-facebook-f" />
            </a>
            <a className="text-dark px-2" href>
              <i className="fab fa-twitter" />
            </a>
            <a className="text-dark px-2" href>
              <i className="fab fa-linkedin-in" />
            </a>
            <a className="text-dark px-2" href>
              <i className="fab fa-pinterest" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="row px-xl-5">
      <div className="col">
        <div className="nav nav-tabs justify-content-center border-secondary mb-4">
          <a className="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Description</a>
          <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Information</a>
          <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="tab-pane-1">
            <h4 className="mb-3">Product Description</h4>
            <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
            <p>Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.</p>
          </div>
          <div className="tab-pane fade" id="tab-pane-2">
            <h4 className="mb-3">Additional Information</h4>
            <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                  </li>
                  <li className="list-group-item px-0">
                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                  </li>
                  <li className="list-group-item px-0">
                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                  </li>
                  <li className="list-group-item px-0">
                    Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                  </li>
                </ul> 
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                  </li>
                  <li className="list-group-item px-0">
                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                  </li>
                  <li className="list-group-item px-0">
                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                  </li>
                  <li className="list-group-item px-0">
                    Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                  </li>
                </ul> 
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-pane-3">
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-4">1 review for "Colorful Stylish Shirt"</h4>
                <div className="media mb-4">
                  <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{width: 45}} />
                  <div className="media-body">
                    <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                    <div className="text-primary mb-2">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <i className="far fa-star" />
                    </div>
                    <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="mb-4">Leave a review</h4>
                <small>Your email address will not be published. Required fields are marked *</small>
                <div className="d-flex my-3">
                  <p className="mb-0 mr-2">Your Rating * :</p>
                  <div className="text-primary">
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                  </div>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="message">Your Review *</label>
                    <textarea id="message" cols={30} rows={5} className="form-control" defaultValue={""} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group mb-0">
                    <input type="submit" defaultValue="Leave Your Review" className="btn btn-primary px-3" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Products Start */}
  
  <div class="container-fluid py-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">You May Also Like</span></h2>
        </div>
        
  
<div className="container-fluid pt-5">
    {/* <div className="text-center mb-4">
      <h2 className="section-title px-5"><span className="px-2">{subcategory?.name}</span></h2>
    </div> */}
    <div className="row px-xl-5 pb-3">
      
      {product.SubCategory?.products?.map(item=>{
        return(
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="card product-item border-0 mb-4">
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          
              <img style={{ height:"300px" }} className="img-fluid w-100" src={"http://localhost:5005/getImage/"+ item.image[0].name} alt />
          
          </div>
          <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 className="text-truncate mb-3">{item.refProduct} </h6>
            <div className="d-flex justify-content-center">
              <h6>{item.price} DT</h6>
              {/* <h6 className="text-muted ml-2"><del>{item.price} </del></h6> */}
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between bg-light border">
            
            <button onClick={()=>{navigate(`/productdetails/${item._id}`); refreshPage()}} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1" />View Detail</button>
            
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






  {/* Products End */}
  {/* Footer Start */}
  <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
    <div className="row px-xl-5 pt-5">
      <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
        <a href className="text-decoration-none">
          <h1 className="mb-4 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border border-white px-3 mr-1">E</span>Shopper</h1>
        </a>
        <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
        <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />123 Street, New York, USA</p>
        <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />info@example.com</p>
        <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3" />+012 345 67890</p>
      </div>
      <div className="col-lg-8 col-md-12">
        <div className="row">
          <div className="col-md-4 mb-5">
            <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
            <div className="d-flex flex-column justify-content-start">
              <a className="text-dark mb-2" href="index.html"><i className="fa fa-angle-right mr-2" />Home</a>
              <a className="text-dark mb-2" href="shop.html"><i className="fa fa-angle-right mr-2" />Our Shop</a>
              <a className="text-dark mb-2" href="detail.html"><i className="fa fa-angle-right mr-2" />Shop Detail</a>
              <a className="text-dark mb-2" href="cart.html"><i className="fa fa-angle-right mr-2" />Shopping Cart</a>
              <a className="text-dark mb-2" href="checkout.html"><i className="fa fa-angle-right mr-2" />Checkout</a>
              <a className="text-dark" href="contact.html"><i className="fa fa-angle-right mr-2" />Contact Us</a>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
            <div className="d-flex flex-column justify-content-start">
              <a className="text-dark mb-2" href="index.html"><i className="fa fa-angle-right mr-2" />Home</a>
              <a className="text-dark mb-2" href="shop.html"><i className="fa fa-angle-right mr-2" />Our Shop</a>
              <a className="text-dark mb-2" href="detail.html"><i className="fa fa-angle-right mr-2" />Shop Detail</a>
              <a className="text-dark mb-2" href="cart.html"><i className="fa fa-angle-right mr-2" />Shopping Cart</a>
              <a className="text-dark mb-2" href="checkout.html"><i className="fa fa-angle-right mr-2" />Checkout</a>
              <a className="text-dark" href="contact.html"><i className="fa fa-angle-right mr-2" />Contact Us</a>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
            <form action>
              <div className="form-group">
                <input type="text" className="form-control border-0 py-4" placeholder="Your Name" required="required" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control border-0 py-4" placeholder="Your Email" required="required" />
              </div>
              <div>
                <button className="btn btn-primary btn-block border-0 py-3" type="submit">Subscribe Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="row border-top border-light mx-xl-5 py-4">
      <div className="col-md-6 px-xl-0">
        <p className="mb-md-0 text-center text-md-left text-dark">
          © <a className="text-dark font-weight-semi-bold" href="#">Your Site Name</a>. All Rights Reserved. Designed
          by
          <a className="text-dark font-weight-semi-bold" href="https://htmlcodex.com">HTML Codex</a><br />
          Distributed By <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
        </p>
      </div>
      <div className="col-md-6 px-xl-0 text-center text-md-right">
        <img className="img-fluid" src="img/payments.png" alt />
      </div>
    </div>
  </div>
</div>

      
         

  )
}

export default ProductDetails