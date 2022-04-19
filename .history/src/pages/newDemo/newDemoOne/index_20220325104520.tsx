import React, { useEffect, useState } from "react"
import "./index.less"
// effect 得依赖频繁变化 该怎么办
function newDemoOne () {
  const [count,setcount] = useState(1)



  return (
    <>
   <div>111</div>
    </>
  )
}

export default newDemoOne