import React, { useEffect, useState } from "react"
import "./index.less"
// effect 得依赖频繁变化 该怎么办
function NewDemoOne () {
  
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
  // 有bug类型  他的值不会实时更新
    useEffect(() => {
      const id = setInterval(() => {
        setCount(count + 1); // 这个 effect 依赖于 `count` state
      }, 1000);
      return () => clearInterval(id);
    }, []); // 🔴 Bug: `count` 没有被指定为依赖



    
  //解决这个问题
  useEffect(() => {
    const id = setInterval(() => {
      setCount2(c => c+1); // ✅ 在这不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 我们的 effect 不使用组件作用域中的任何变量

  return (
    <>
   <div>{count }{count2}</div>
    </>
  )
}

export default NewDemoOne