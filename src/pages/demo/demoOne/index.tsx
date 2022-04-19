import React from "react";
import { useSelector } from "react-redux";
export default function DemoOne () {
 const {reduxDemo} = useSelector((state:ReduxInfo) => state )
  return (
    //使用redux 引入下拉框的数据
    <div>
      {reduxDemo.map((item) => {
       return(
        <div key={item.value}>{item.label}</div>
        
       )
      })}
    </div>
  )
}