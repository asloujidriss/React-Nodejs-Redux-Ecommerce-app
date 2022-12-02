import React, { useState } from 'react'

const Filter = ({filtration}) => {
 
    const [filter, setFilter] = useState("")

    const onChangeHandler =(e)=>{
        const refProduct = e.target.value
        setFilter(refProduct)
        filtration(refProduct)
    }




  return (
<div>
<li style={{marginLeft:"10px"}}  className="xn-search">
          <form role="form">
            <input type="text"  placeholder="Search..." value={filter} onChange={onChangeHandler} />
          </form>
        </li> 


    </div>
  )
}

export default Filter