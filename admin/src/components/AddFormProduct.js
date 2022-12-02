
import 'bootstrap/dist/css/bootstrap.min.css';

import { Form, Button, Input, Select, message, Upload, InputNumber, Space, Modal } from "antd";
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsService from "../services/ProductService"
import { UploadOutlined,InboxOutlined,PlusOutlined  } from '@ant-design/icons';
import SubcategoryServices from '../services/SubcategoryServices';
import { AddProductFailure, AddProductStart, AddProductSuccess } from '../Redux/ProductRedux';
import { useDispatch } from 'react-redux';


const {Option} = Select
const { Dragger } = Upload;

const AddFormProduct = () =>{
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const [subcategories, setSubcategories] = useState([])
  const [data, setData] = useState({})
  const [image, setImage] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: []
  })
  

 const handleCancel = () =>setImage({ previewVisible: false });

 const  handlePreview = file => {
    setImage({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  const handleUpload = ({ fileList:newfileList }) => {
   
    console.log('fileList=====>', fileList);

    setImage(prev=>({
      ...prev,
      ["fileList"]:newfileList
    }));
  };
  // console.log("my images",image)

  const { previewVisible, previewImage, fileList } = image;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onChangehandler = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
    //console.log(data)
     }
     const onChange = (value) => {
     // console.log('changed', value);
      setData(prev=>({
        ...prev,
        "qte":value
      }))
    };

    const onChange1 = (e) => {
      const value = e.target.value
      //console.log('Change:',value);
      setData(prev=>({
        ...prev,
        "description":value
      }))
    };

    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setData(prev=>({
        ...prev,
        "SubCategory":value
      }))
    };

     const onSubmithandler=(e)=>{
      e.preventDefault()
      dispatch(AddProductStart())
      const formdata = new FormData()

       let images =[]
       image.fileList.map((img)=>{
        images.push(img.originFileObj)
       })
        //  console.log("imaaaaages",images)

      for (let i = 0; i < images.length; i++) {
      formdata.append("photos" , images[i])
       }
      formdata.append("refProduct" ,data.refProduct)
      formdata.append("price" ,data.price)
      formdata.append("description" ,data.description)
      formdata.append("qte",data.qte)
      formdata.append("SubCategory",data.SubCategory)
  
          //navigate('/GetAllProducts')
          ProductsService.create(formdata)
          .then(res=>{
            setData(res.data.data)
            dispatch(AddProductSuccess(res.data.data))
          })
          .catch(err=>{
            console.log(err.response)
            dispatch(AddProductFailure())
          })

     }
     const getAll =()=>{
      SubcategoryServices.getall().then(res=>{
        setSubcategories(res.data.data)
      }).catch(err=>{
        console.log(err)
      })
     }
useEffect(() => {
 getAll()
}, [])

     
     return (
 
        <div>
<header className="App-header">

<Form
autoComplete="off"
labelCol={{ span: 8 }}
wrapperCol={{ span: 18 }}
onFinish={(values) => {
  console.log({ values });
}}
onFinishFailed={(error) => {
  console.log({ error });
}}
>
<Form.Item
        name="refProduct"
        label="refProduct"
        rules={[
          {
            required: true,
            message: 'Please input a refProduct',
        },
        {whitespace: true},
        {min:3}
    ]}
      hasFeedback
      >
        <Input placeholder="refProfuct" name="refProduct" onChange={onChangehandler}/>
      </Form.Item>
      <Form.Item
        name="price"
        label="price"
       
        rules={[
          {
            required: true,
            message: 'Please input a refProduct',
        },
        {whitespace: true},
        
        ]}
        hasFeedback
      >
        <Input  placeholder="Type a price" name="price" onChange={onChangehandler} />
      </Form.Item>
      <Form.Item
       name="qte"
       label="qte"
       rules={[
         {
           required: true,
           message: 'Please input Quantity!',
         },
       ]}
      
      >
    <InputNumber size="large" min={1} max={100000} defaultValue={0} style={{ width: 315 }} name="qte" onChange={onChange} />
      </Form.Item>
     
    <Form.Item
     name="description"
     label="Description"
     rules={[
        {
            required: true,
            message:"Type description!",
        },
    ]}
     hasFeedback>
    <TextArea
    showCount
    maxLength={100}
    style={{height: 120}}
    name="description"
    onChange={onChange1}
  />
    </Form.Item>

    <Form.Item
    name="SubCategory"
    label="SubCategory"
    rules={[
       {
           required:true,
           message:"Type some image!",
       },
       {whitespace:true}, 
       {min:3}
   ]}
    hasFeedback>
 <Select defaultValue="choisissey subCat" style={{ width: 315 }} name="SubCategory" onChange={handleChange}>
  {subcategories?.map(sub=>{
    return (
      <Option key={sub._id} value={sub._id}>{sub.name}</Option>
    )
  })}
 
 </Select>
    </Form.Item>


    <Form.Item
          name="image"
          label="Photo"
          rules={[
            {
              required: true,
              message: "Please enter your photo",
            },
            { type: "file", message: "Please enter image" },
          ]}
          hasFeedback
          >
        <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    size="large"
  >
   <Upload
          listType="picture-card"
          fileList={fileList}
          name="image"
          onPreview={handlePreview}
          onChange={handleUpload}
          beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
        >
          {uploadButton}
    </Upload>
    
    <Modal
          visible={previewVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal> 
    </Space>
    </Form.Item>
    <Form.Item wrapperCol={{ span: 24 }}>
        <Button block type="primary" Type="submit" onClick={onSubmithandler} >
            Submit
        </Button>
    </Form.Item>
</Form>
</header>
        </div>
        

     )
}

export default AddFormProduct;