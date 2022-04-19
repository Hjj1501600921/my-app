//这个是路由拆分出来的一个函数结构
import React from "react"
import { Route , Routes}  from "react-router-dom"
const renderRoutes = (routes: RouteConfig[]) =>{
   return  routes ? (
      <Routes>
      {routes.map((item:RouteConfig,i:number) => (
         <Route
         path={item.path}
         key={item.path || i}
         element={<item.element/>}
         />
      ))}
      </Routes>
   ): null
}
  
export default renderRoutes