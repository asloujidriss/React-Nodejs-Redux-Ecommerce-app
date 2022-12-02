
import React, { useEffect, useState } from 'react'
import { Descriptions,Button } from 'antd';
import OrderServices from '../../../services/OrdersServices';
import { useParams } from 'react-router-dom';

import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const GetOrderDetails = () => {
    const [order,setOrder]= useState([])

    const {id} = useParams()
    
  
    const getdetails =()=>{
        OrderServices.getById(id).then(res=>{
            console.log("orderdetails",res)
            setOrder(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(() => {
        getdetails()
    }, [])
    
    const inputRef = useRef(null);
    const printDocument = () => {
      html2canvas(inputRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0);
       let totalPDFPages =[]
        for (let i = 1; i <= totalPDFPages; i++) {
          pdf.addPage() };

        pdf.save("download.pdf");
      });
    };

  


     
   




  return (
   
    <div>
       
       <button onClick={printDocument}  style={{display:"flex", height:"50px",width:"130px",borderRadius:"5%"}}
                                     type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                      Export To Pdf
                                     </button>
                                    

    <div id="divToPrint" className="mt4" style={{
      backgroundColor: '#f5f5f5',
      width: '210mm',
      minHeight: '297mm',
      marginLeft: 'auto',
      marginRight: 'auto'
    }} ref={inputRef}>
   
    <div style={{width:"100%", backgroundColor:"floralwhite",fontSize:"20px", paddingLeft:"30px"}}>
                                   
     <div>                                
   <Descriptions title="Client Info">
    <Descriptions.Item label="UserName">{order.client?.firstName} {order.client?.lastName}  </Descriptions.Item>
    <Descriptions.Item label="Telephone">{order.client?.tel} </Descriptions.Item>
    <Descriptions.Item label="email">{order.client?.email} </Descriptions.Item>
    <Descriptions.Item label="Remark">empty</Descriptions.Item>
    <Descriptions.Item label="Address">{order.client?.addressL} </Descriptions.Item>
  </Descriptions>
  </div>
  </div>
  
  
      <div >
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"chocolate",fontSize:"50px"}}> List Of  Products</div>
        {order.products?.map((item,index)=>{
            return (
              
                <Descriptions
              
                title={index}
                bordered
                 column={{ xxl: 4,xl: 3,lg: 3,md: 3,sm: 2,xs: 1}}
              > 

            
         <Descriptions.Item style={{fontSize:"30px",width:"100px" }} label="Product">
          <span style={{ backgroundColor:"aqua",fontSize:"20px"}}>{item.product.refProduct}</span>  </Descriptions.Item>
      <Descriptions.Item style={{fontSize:"30px",width:"100px"}} label="Size">
        <span  style={{ backgroundColor:"aqua",fontSize:"20px"}}>

        {item.size ==="1" ? "XS" : item.size === "2" ? "S" : item.size ==="3" ? "M" 
        : item.size ==="4" ? "L" : "XL"} 
        </span>
      </Descriptions.Item>
      <Descriptions.Item style={{fontSize:"30px",width:"100px"}} label="Color">
      <span  style={{ backgroundColor:"aqua",fontSize:"20px"}}>

      {item.color ==="1" ? "White" : item.color ==="2" ? "Black" : item.color ==="3" ? "Red" 
        : item.color ==="4" ? "Blue" : item.color ==="5" ? "Yellow" : "Green"} </span>
      </Descriptions.Item>
      <Descriptions.Item style={{fontSize:"30px",width:"100px"}} label="product QuantityT"> <span  style={{ backgroundColor:"aqua",fontSize:"20px"}}>{item.quantity} Pieces</span></Descriptions.Item>
      <Descriptions.Item style={{fontSize:"30px",width:"100px"}} label="Product PriceT"><span  style={{ backgroundColor:"aqua",fontSize:"20px"}}>{item.price} DT</span></Descriptions.Item>
     
    </Descriptions>

            )
        })}
        <div>
          <div style={{ display:"flex",height:"100px" ,justifyContent:"flex-start", backgroundColor:"white"}}>
       <Descriptions.Item label="Config Info">
       <span style={{fontSize:"25px"}}>Note: </span>
        
      </Descriptions.Item>
      </div>

        <div style={{ display:"flex", justifyContent:"flex-end", backgroundColor:"aqua",fontSize:"20px",paddingRight:"30px" }} >
      <Descriptions.Item label="Config Info">
        <div>
      <span style={{fontSize:"25px"}}>Total Items: {order.QuantityTotal} Pieces </span>
        <br /> 
        <span style={{fontSize:"25px"}}>Total Price: {order.priceTotal} DT </span>
        <br />
        </div>
      </Descriptions.Item>
      </div>
      </div>
      </div>
      </div>
      </div>
  )
}

export default GetOrderDetails