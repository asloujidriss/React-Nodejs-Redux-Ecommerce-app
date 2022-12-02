import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import axios from 'axios';
const DemoColumn = () => {
    const [income, setIncome] = useState([])

  const data = [
    {
      month:'Jan',
      sales: "",
    },
    {
     month:'Feb',
      sales: "",
    },
    {
     month:'Mar',
      sales: "",
    },
    {
      month:'Apr',
      sales: "",
    },
    {
      month:'May',
      sales: "",
    },
    {
      month:'Jun',
      sales: "",
    },
    {
      month:'Jul',
      sales: "",
    },
    {
      month:'Aout',
      sales: "",
    },
    {
        month:'Sep',
        sales: "",
      },
      {
        month:'Oct',
        sales: "",
      },
      {
        month:'Nov',
        sales: "",
      },
      {
        month:'Dec',
        sales: "",
      },
  ];

const getIncome = async ()=>{

    try {
        const res = await axios.get("http://localhost:5005/orders/Income")
        
        res.data.data.map( (item) =>
          data.map((el,index)=>{
            if(index === item._id -1){
              setIncome((prev)=>[
                ...prev,
                {month:el.month, sales:item.total},
              ])
            }
          })
        )
        
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getIncome()
},[])










  const config = {
    data:income,
    xField: 'month',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'month',
      },
      sales: {
        alias: 'sales'+" "+'DT',
      },
    },
  };
  return (
    <div>
         <h1 style={{marginLeft:"50px",color:"red"}}>Income By Month</h1>
    <div style={{height:"250px"}}>
  <Column {...config} />
  </div>
  </div>
  );
};


export default DemoColumn
