import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import "@ant-design/flowchart/dist/index.css"
import axios from 'axios';



const DemoLine = () => {

    const [userStats, setUserStats] = useState([]);
    //console.log("userStats===>", userStats)
  const data= [
     {month:'Jan'},     
     {month:'Feb'},
     {month:'Mar'},  
     {month:'Apr'},  
     {month:'May'},
     {month:'Jun'},
     {month:'Jul'},
     {month:'Aout'},
     {month:'Sep'},
     {month:'Oct'}, 
     {month:'Nov'},
     {month:'Dec'},   
  ];

   


    const getStats = async () => {
      try {
        const res = await axios.get("http://localhost:5005/clients/stats");
        
        res.data.data.map((item) =>
        data.map((el,index)=>{
        
          if(index === item._id -1){
          
            setUserStats((prev) => [
              ...prev,
               { month:el.month, value:item.total },
            ])
          }
        })
        );
      } catch {}
    };

    useEffect(() => {
    getStats();
  }, []);


  const config = {
    data:userStats,
    title:{
        visible:true,
        text:"userStats"
    },
    xField: 'month',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  return (

  <div>
    <h1 style={{marginLeft:"20px",color:"red"}} >REGISTRED USERS BY MONTH</h1>
     <div style={{height:"250px"}}>
  <Line {...config} />
  </div>
  </div>
)};



export default DemoLine