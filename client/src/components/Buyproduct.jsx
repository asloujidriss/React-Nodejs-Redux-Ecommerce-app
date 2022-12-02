import React, { useEffect, useState } from 'react'
import  {addToCart} from '../Redux/CartRedux'
import ProductServices from '../Services/ProductServices'
import {useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Radio } from 'antd';


const Buyproduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const {id} = useParams()
    const [size, setSize] = useState(1);
    const [color, setColor] = useState(1);
    const [product,setProduct] = useState({})
    
    const [quantity,setQuantity] = useState(1)
    
   
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
                 navigate('/cart')
            }  
  return (
    <div>


<div className="container-fluid py-5">
<div className="row px-xl-5">
  <div className="col-lg-5 pb-5">
    <div id="product-carousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner border">
      {product?.image?.map(img=>{
          return(
            <div key={img._id} className="carousel-item active">
        
            <img className="w-100 h-100" src={"http://localhost:5005/getImage/"+ img?.name} alt="Image" />
          </div>
          )
        })}
        {/* <div className="carousel-item">
          <img className="w-100 h-100" src={"http://localhost:5005/getImage/" + product.image[1]?.name} alt="Image" />
        </div>
        <div className="carousel-item">
          <img className="w-100 h-100" src={"http://localhost:5005/getImage/" + product.image[2]?.name} alt="Image" />
        </div>
        <div className="carousel-item">
          <img className="w-100 h-100" src={"http://localhost:5005/getImage/" + product.image[3]?.name} alt="Image" />
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
    <h3 className="font-weight-semi-bold">{product?.refProduct}</h3>
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
      <Radio.Group  onChange={onChangeColor} value={color}>
    
    <Radio style={{marginLeft:"20px"}} value={1}>White</Radio>
    <Radio style={{marginLeft:"20px"}} value={2}>Black</Radio>
    <Radio style={{marginLeft:"20px"}} value={3}>Red</Radio>
    <Radio style={{marginLeft:"20px"}} value={4}>Blue</Radio>
    <Radio style={{marginLeft:"20px"}} value={5}>Yellow</Radio>
    <Radio style={{marginLeft:"20px"}} value={6}>Green</Radio>
     </Radio.Group>
     
    </div>
    <div style={{display:"flex", width:"140px", marginRight:"400px"}} className="d-flex align-items-center mb-4 pt-2">
      <div className="input-group quantity mr-3" style={{width: "200"}}>
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
      
    </div>
      <button className="btn btn-primary px-3" onClick={addtocart} ><i className="fa fa-shopping-cart mr-1" /> Add To Cart</button>
    
  </div>
</div>

</div>
</div>
  )
}

export default Buyproduct