
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {OverlayTrigger, Tooltip, Button} from 'react-bootstrap';
import {DownloadOutlined} from '@ant-design/icons'

import fileDownload from 'js-file-download'



const ProductList = ({onDelete,currentProducts}) => {

  const navigate = useNavigate()



const handleDownload = (url, filename) => {
  axios.get(url, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/multipart/form-data'
    },
    
  })
  .then((res) => {
    fileDownload(res.data,"download.pdf")
  }).catch(err=>{
    console.log(err)
    if(err){
      alert("you are not authenticated")
    }
  })
}

  return (
    <>
         {currentProducts?.map((item, index) => {
                      return (
                        <tr key={item._id} >
                          <td class="text-center">{index}</td>
                          <td><strong>{item.refProduct}</strong></td>
                          <td>{item.price}</td>
                          <td>{item.qte}</td>
                          <td>{item.description}</td>
                          <OverlayTrigger
    
    overlay={
      <Tooltip id={`tooltip-top`}>
        <strong>Download File</strong>.
      </Tooltip>
    }
  >
       <Button icon={<DownloadOutlined />} onClick={(e)=>handleDownload(`http://localhost:5005/getImage/${item.image[0].name}`)} target="_blank" rel="noreferrer" >
                            <td>
                            <DownloadOutlined style={{width:"30px"}} />
                            {item.image[0].name}
                          
                          </td>
                          </Button>
  </OverlayTrigger>
                            

                          {/* <td>
                            {item.image && (
                                <div>
                              <img
                                style={{ height: "100px" }}
                                src={
                                  "http://localhost:5005/getImage/" +
                                   item.image[0]?.name}/>
                              </div>
                            )}
                          </td> */}
                        
                          <td>

                          <OverlayTrigger
    
    overlay={
      <Tooltip id={`tooltip-top`}>
        <strong>Edit product</strong>.
      </Tooltip>
    }
  >
        { <button onClick={()=>navigate(`/UpdateProduct/${item._id}`)} class="btn btn-default btn-rounded btn-sm"><span class="fa fa-pencil"></span></button>}
  </OverlayTrigger>
  
  <OverlayTrigger

    overlay={
      <Tooltip id={`tooltip-top`}>
        <strong>Delete product</strong>.
      </Tooltip>
    }
  >
       <button class="btn btn-danger btn-rounded btn-sm" onClick={(e)=> onDelete(item._id)}><span class="fa fa-times"></span></button>
  </OverlayTrigger>               
                          </td>
                        </tr>
                      );
                    })}
    </>
  )
}

export default ProductList