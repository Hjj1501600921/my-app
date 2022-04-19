//引入模块加载的插件
import Loadable from "@src/utils/Loadable"
// 主界面路由
const routeConfig: RouteConfig[] = [
  {
    path: '/', // 路径
    element: Loadable(() => import('../layouts/BaishBroad')), // 引入的组件
    exact: true,
  },
  {
    path: '/login', // 路径
    element: Loadable(() => import('../pages/login')), // 引入的组件
    exact: true,
  },
  {
    path: '/homepage/*', // 路径
    element: Loadable(() => import('../layouts/BsicLayout')), // 引入的组件
    exact: true,
  },

];
// 主体菜单路由
const contentRouteConfig: RouteConfig[] = [
  {
    path: 'demo/one', // 路径
    element: Loadable(() => import('../pages/demo/demoOne')), // 引入的组
  },
  {
    path: 'demo/two', // 路径
    element: Loadable(() => import('../pages/demo/demoTwo')), // 引入的组件
  },
  {
    path: 'demo/three', // 路径
    element: Loadable(() => import('../pages/demo/demoThree')), // 引入的组件
  }, {
    path: 'demo/four', // 路径
    element: Loadable(() => import('../pages/demo/demoFour')), // 引入的组件
  }, {
    path: 'demo/five', // 案列表格封装
    element: Loadable(() => import('../pages/demo/demoFive')), // 引入的组件
  }, {
    path: 'demo/six', // 案列表格封装
    element: Loadable(() => import('../pages/demo/demoSix')), // 引入的组件
  }, {
    path: 'demo/seven', // 案列表格封装
    element: Loadable(() => import('../pages/demo/demoSeven')), // 引入的组件
  },
  // 视频通话
 {
    path: 'radio/radio', 
    element: Loadable(() => import('../pages/视频通话/index')), // 引入的组件
  },
    // 新知识点一
 {
  path: 'radio/radio', 
  element: Loadable(() => import('../pages/newDemo/newDemoOne')), // 引入的组件
},
  // 新知识点二
  {
    path: 'radio/radio', 
    element: Loadable(() => import('../pages/newDemo/newDemoTwo')), // 引入的组件
  },
    // 新知识点三
 {
  path: 'radio/radio', 
  element: Loadable(() => import('../pages/newDemo/newDemoThree')), // 引入的组件
},
  // 新知识点四
  {
    path: 'radio/radio', 
    element: Loadable(() => import('../pages/newDemo/newDemoFour')), // 引入的组件
  },
    // 新知识点五
 {
  path: 'radio/radio', 
  element: Loadable(() => import('../pages/newDemo/newDemoFive')), // 引入的组件
},
]

export { routeConfig, contentRouteConfig }