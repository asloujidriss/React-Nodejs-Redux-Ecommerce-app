import React, { useEffect, useState } from 'react'

import { Select } from 'antd';
import CategorySevices from '../../../services/CategoryService';
import SubcategoryServices from '../../../services/SubcategoryServices'
import { useNavigate } from 'react-router-dom';

const { Option } = Select;


function AddCategory() {
  const navigate = useNavigate()

    const [subcategories, setSubcategories]=useState([])
    const [data, setData]=useState({
        name:"",
        description:"",
        subCategories:[],
        image:""
    })

    const children = [];

    for (let i =0; i <Option.length ; i++) {
      children.push(<Option key={i.toString(i) + i}>{i.toString(i) + i}</Option>);
    }
    
    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setData(prev=>({
        ...prev,
        ["subCategories"]:value
       }))
    };

    const changeHandler=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

     const onSubmitHandler=(e)=>{
        e.preventDefault()

      

        CategorySevices.create(data).then(res=>{
            console.log("add category=====>",res)
            setData(res.data.data)
            navigate("/getcategories")
        }).catch(err=>{
            console.log(err)
        })

    }

    const getall =()=>{
        SubcategoryServices.getall().then(res=>{
        
            setSubcategories(res.data.data)
        }).catch(err=>{
            console.log(err)
        })

    }
    
useEffect(() => {
    getall()
    
}, [])




  return (
    <div style={{ display:"flex", alignItem:"center", justifyContent:"center", paddingRight:"600px"}}>
        



    <form style={{width:"400px"}} onSubmit={onSubmitHandler} >
    <h3 style={{marginLeft:"50px"}} >Add category</h3>
  <div className="form-group">
    <label htmlFor="exampleInputCtegory1">category name</label>
    <input type="text" className="form-control" id="exampleInputCtegory1" name="name" aria-describedby="categoryHelp"  onChange={changeHandler} />
   
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputDescription1">Description</label>
    <input type="textarea" className="form-control" id="exampleInputDescription1" name="description" onChange={changeHandler} />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputSubcategory1">subcategory</label>
    <Select  mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Add subcategory"
      defaultValue={[]}
       name="subCategories" onChange={handleChange}>
                                  
                                   {subcategories.map((item)=>{
                                       return(
                                           <Option key={item._id} value={item._id}>
                                               {item.name} 
                                           </Option>
                                       )
                                   })}
                                    {children}
                                   </Select>
  </div>
  
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default AddCategory
