import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import UsersService from '../services/UsersService'
const DemoPie = () => {

  const [users, setUsers] = useState([])


const Homme = users.filter(u=> u.gender === "male")
const Femme = users.filter(u=> u.gender === "female")

    const getAll = ()=>{
        UsersService.getAll().then(res=>{
        
            setUsers(res.data.data)
        })
    }

    useEffect(() => {
       getAll()
        },[])

    const data = [
      {
        type: 'Homme',
        value: Homme.length,
      },
      {
        type: 'Femme',
        value: Femme.length,
      }, 
     
    ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return(
  <div >
    <h1 style={{marginLeft:"50px",color:"red"}}>Users By Genre</h1>

  <div style={{height:"250px"}}>
   <Pie {...config} />;
   </div>
   </div>
)};



export default DemoPie














