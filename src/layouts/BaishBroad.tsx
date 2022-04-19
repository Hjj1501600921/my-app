// 这是一个重新定向的一个组件
import React from "react"
// v6改用了redirect  使用Navigate进行重定向
import { Navigate } from "react-router-dom"
function BaishBroad () {
  return <Navigate to="/login"/>
}

export default BaishBroad