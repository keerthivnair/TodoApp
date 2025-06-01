import React, { useEffect, useState } from "react";

function InPageNavigation({ children }) {
  const [state, setState] = useState(0);
  
  return (
    <>
      <div>
        <button className="cursor-pointer" onClick={()=>{setState(0)}}>Upcoming Todos</button>
        <button className="cursor-pointer" onClick={()=>{setState(1)}}>Completed Todos</button>
      </div>
      <div>{children[state]}</div>
    </>
  );
}

export default InPageNavigation;
