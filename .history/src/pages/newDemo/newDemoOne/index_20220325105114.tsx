import React, { useEffect, useState } from "react"
import "./index.less"
// effect 得依赖频繁变化 该怎么办
function NewDemoOne () {
  
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const id = setInterval(() => {
        setCount(C =>C+1); // 这个 effect 依赖于 `count` state
      }, 1000);
      return () => clearInterval(id);
    }, []); // 🔴 Bug: `count` 没有被指定为依赖
  

  return (
    <>
   <div>{count}</div>
    </>
  )
}

export default NewDemoOne