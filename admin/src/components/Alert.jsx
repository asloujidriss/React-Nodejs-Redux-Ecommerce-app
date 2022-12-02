import React from "react";

function Alert({message, show}) {
  return (
  
    <div class="alert alert-info" role="alert" style={{display: show ? "block": "none", alignItems:"center",justifyContent:"center",
    fontSize:"20px", color:"white",backgroundColor:"red",paddingLeft:"450px" }}>
        {message}
    </div>
    
  );
}

export default Alert;

