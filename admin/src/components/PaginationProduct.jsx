import React, { useEffect, useState } from 'react'

const PaginationProduct = ({pages,setCurrentPage,currentProducts,sortedProducts}) => {

    const numOfPages =[]

    for ( let i=1; i <= pages ; i++) {
        numOfPages.push(i)
    }
    const [currentButton,setCurrentButton] = useState(1)


    useEffect(() => {
      setCurrentPage(currentButton)
    }, [currentButton,setCurrentPage])
    


  return (
    <div>
 <div  style={{display:"flex", alignItems:"center", justifyContent:"center"}}  className="clearfix">
				<div style={{display:"flex",alignItems:"center",justifyContent:"space-between" ,color:"red",width:"200px"}} className="hint-text">
          Showing <b> {currentProducts?.length} </b> out of  <b>{sortedProducts?.length} </b> entries</div>
				<ul style={{display:"flex", justifyContent:"flex-end"}} className="pagination">
				
                <li class={`${currentButton===1 ? "page-item disabled" : 'page-item'  }`}><a href="#" 
                  onClick={()=>setCurrentButton((prev)=> prev === 1 ? prev : prev - 1)}
                  >Previous</a></li>

              {numOfPages.map((page,index)=>{
               
                return(
                  <li  key={index} className={`${currentButton === page ? "page-item active" : 'page-item'}`}>
                              <a href="#" className="page-link" 
                              onClick={()=> setCurrentButton(page)}
                              >{page}</a></li>
                              )

                  })}


            <li class={`${currentButton===numOfPages.length ?" page-item disabled" : 'page-item'  }`}><a href="#"
                  onClick={()=>setCurrentButton((next)=> next === numOfPages.length  ? next : next + 1)}
                  >Next</a></li>


				</ul>
			</div>
    </div>
  )
}

export default PaginationProduct