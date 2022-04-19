//  设置路由跳转，将路由和路径拼在一起的一个组件

import {routeConfig} from "./route.config"
import renderRoutes from "@src/utils/renderRoutes"
import {  HashRouter } from "react-router-dom"
import config from "@src/config/config"
import * as React from "react";
function Routes() {
  return (
<HashRouter basename={config.baseName}>
      {renderRoutes(routeConfig)}
    </HashRouter>
  )

}
export default Routes