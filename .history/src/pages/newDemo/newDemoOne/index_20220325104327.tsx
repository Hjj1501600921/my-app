import React, { useEffect, useState } from "react"
import "./index.less"
// effect 得依赖频繁变化 该怎么办
function newDemoOne () {
  const [count,setcount] = useState(1)

  useEffect(() => {
    let con = setInterval(() => {
      setcount(count+1) // 这是有bug得  平方操作会影响
    },1000)
  },[])
  

  return (
    <>
   <div>111</div>
    </>
  )
}

export default newDemoOne