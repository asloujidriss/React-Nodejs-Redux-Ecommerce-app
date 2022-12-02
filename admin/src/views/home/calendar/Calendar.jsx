import React, { useState } from 'react'
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'

import { Input,Button } from 'antd';
import CalendarService from '../../../services/CalendarService';
import moment from 'moment'

import { Alert } from 'antd';
import Marquee from 'react-fast-marquee'
const { TextArea } = Input;

const CalendarAPP = () => {
  // const timestamp = date.now()
  const [event, setEvent] = useState("")
    const [date, setDate] = useState([new Date(1,6,2021).toLocaleDateString(),new Date(10, 6, 2021)])
  const [show, setShow] = useState(false) 
  const [message, setMessage] = useState("")
   

    const NewDate = {
          event:event,
          Start:date[0],
          End:date[1]
         }
       const  date1 =new Date(NewDate.Start).getFullYear()  +"-"+ Number(new Date(NewDate.Start).getMonth()+1) +"-"+Number(new Date(NewDate.Start).getDate()+1);
       NewDate.Start = date1
      // console.log("newda",  NewDate.Start)
      // console.log("newEnd", NewDate.End)
    const HandleSubmit =()=>{
      CalendarService.create(NewDate).then(res=>{
        console.log(res)
        setMessage(res.data.message)
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 5000);
      }).catch(err=>{
        console.log(err)
        setMessage(err.response.data.message)
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 9000);
      })
    }


  return (

<div style={{marginLeft:"400px"}} className='app'>


   <h1 style={{marginLeft:"70px",marginTop:"100px" ,color:"blue"}} className='header'>MY Calendar</h1>
   <div>
  <div style={{width:"350px"}} >
    <TextArea rows={4} placeholder="what event you want register" onChange={(e)=>setEvent(e.target.value)} />
    <label style={{marginLeft:"70px", color:"red"}} >TYPE YOUR EVENT PLEASE</label>
   </div>
   <div style={{marginTop:"10px", width:"450px"}} >
    <Calendar  onChange={setDate} 
           value={date}
           selectRange={true}
           defaultView='decade'

          />
          
   </div>
   </div>
   {date.length > 0 ? (
   <p>
     <span style={{marginLeft:"70px", color:"blue"}}>Start:</span>
     {moment(date[0]).format("DD-MM-YYYY")}
     &nbsp;
     &nbsp;
     <span style={{color:"blue"}}>End:</span>{moment(date[1]).format("DD-MM-YYYY")}
   </p>
          ) : (
   <p>
      <span>Default selected date:</span>{date}
   </p> 
          )
   }
   {show ? 
  <Alert style={{width:"350px"}}
    banner
    message={
      <Marquee pauseOnHover gradient={false}>
        {message}
       
      </Marquee>
    }
  /> : ""
}
   <Button style={{width:"350px", marginTop:"15px"}} type="primary" block onClick={HandleSubmit} >
      submit
    </Button>
 </div>
  )
}

export default CalendarAPP