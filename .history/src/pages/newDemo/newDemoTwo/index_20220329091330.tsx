import React from "react"
import "./index.less"
function NewDemoTwo () {
// 构造地图对象的方法一：使用地图容器ID创建
var map = new AMap.Map('container', {
  zoom:11,//级别
  center: [116.397428, 39.90923],//中心点坐标
  viewMode:'3D'//使用3D视图
});

  return (
    <>
   <div id="container" style={{width:500, height:300}}></div>
    </>
  )
}

export default NewDemoTwo