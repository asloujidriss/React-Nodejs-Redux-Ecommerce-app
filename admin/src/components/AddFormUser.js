

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space,Upload, Modal } from "antd";
import { UploadOutlined,UserOutlined,LockOutlined,PhoneOutlined,HomeOutlined,InboxOutlined,UsergroupAddOutlined   } from '@ant-design/icons';

import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersService from '../services/UsersService';

const { Option } = Select;


const AddFormUser = () =>{
  const navigate = useNavigate()
  
    const [image, setImage] = useState({
      previewVisible: false,
      previewImage: "",
      file: ""
    })
    const [data, setData] =useState({
      firstName:"",
      lastName:"",
      email:"", 
      password:"",
      confirmpass:"",
      tel:"",
      addressL:"",
      gender:"",
      dob:"",
      image:"",
    })
    const onChangehandler=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
        console.log(data)
    }

    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setData(prev=>({
        ...prev,
        ["gender"]:value
      }))
    };
    const onChange = (date, dateString) => {
      console.log("Date",date, dateString);
      setData(prev=>({
        ...prev,
        ["dob"]:date._d
      }))
    };
    
  const  handleCancel = () => setImage({ previewVisible: false });
  const  handlePreview = file => {
    setImage({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      })
    }
   const handleUpload = ( file) => {
      console.log('file', file);
      setImage( file );
    };

      const onSubmithandler=(e)=>{
        e.preventDefault()
        
        const formdata = new FormData()
        
        formdata.append('firstName',data.firstName)
        formdata.append('lastName',data.lastName)
        formdata.append('email',data.email)
        formdata.append('password',data.password)
        formdata.append('confirmpass',data.confirmpass)
        formdata.append('tel',data.tel)
        formdata.append('addressL',data.addressL)
        formdata.append('dob',data.dob)
        formdata.append('gender',data.gender)
        formdata.append('photo',image.fileList[0].originFileObj)
        
        UsersService.create(formdata).then(res=>{
          console.log("response>>>>>>>",res)
          navigate('/GetUsers')
          setData(res.data)
        }).catch(err=>{
            console.log("error",err)
        })
    }

    const { previewVisible, previewImage, fileList } = image;
   
    

     return (
   
      <div className="App"  style={{  
        backgroundImage:  `url("https://www.fnordware.com/superpng/pnggrad16rgb.png")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      <header className="App-header"  >
      
        <Form 
          style={{ marginRight:"50px"}} 
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={(values) => {
            console.log({ values });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            name="firstName"
            label="FirstName"
            rules={[
              {
                required: true,
                message: "Please enter your firstname",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input
            style={{marginTop:"10px"}}
             prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="Type your last name"  name="firstName" onChange={onChangehandler} />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please enter your LastName",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Type your name"  name="lastName" onChange={onChangehandler} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
             
            ]}
            hasFeedback
          >
            <Input prefix={<InboxOutlined  className="site-form-item-icon" />} placeholder="Type your email"  name="email" onChange={onChangehandler} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
              { min: 6 },
              {
                validator: (_, value) =>
                  value && value.includes("A")
                    ? Promise.resolve()
                    : Promise.reject("Password does not match criteria."),
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="Type your password"  name="password" onChange={onChangehandler} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered does not match."
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm your password"  name="confirmpass" onChange={onChangehandler} />
          </Form.Item>

          <Form.Item  label="Gender"  requiredMark="optional">
            <Select prefix={<UsergroupAddOutlined className="site-form-item-icon"/>}  placeholder="Select your gender"  name="gender" onChange={handleChange}>
              <Option value="male">Male</Option>
              <Option  value="female">Female</Option>
              
            </Select>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              {
                required: true,
                message: "Please provide your date of birth",
              },
            ]}
            hasFeedback
           
          >
            <DatePicker 
              style={{ width: "100%" }}
              picker="date"
              placeholder="Chose date of birth"
              name="dob"
              onChange={onChange}
             />
          </Form.Item>
          <Form.Item
            name="tel"
            label="telphone Number"
            rules={[
              {
                required: true,
                message: "Please enter your tel Num",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input prefix={<PhoneOutlined  className="site-form-item-icon" />} placeholder="Type your telphone number"  name="tel" onChange={onChangehandler} />
          </Form.Item>
          <Form.Item
            name="addressL"
            label="address livraison"
            rules={[
              {
                required: true,
                message: "Please enter your address livraison",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input prefix={<HomeOutlined  className="site-form-item-icon" />} placeholder="Type your address"  name="addressL" onChange={onChangehandler} />
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
      listType="picture"
      fileList={fileList}
      onPreview={handlePreview}
      onChange={handleUpload}
      beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
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
          <Form.Item
            name="agreement"
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        "To proceed, you need to agree with our terms and conditions"
                      ),
              },
            ]}
          >
          

            <Checkbox>
              {" "}
              Agree to our <a href="#">Terms and Conditions</a>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button style={{marginLeft:"20px",marginBottom:"10px"}}  block type="primary" Type="submit" onClick={onSubmithandler}>
              Register
            </Button>
          </Form.Item>
        </Form>
      
      </header>
    </div>


     )
}

export default AddFormUser;