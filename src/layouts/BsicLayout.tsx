import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
//引入头部组件
import BsishHeader from "./BsishHeader"
import './style.less'
//引入图标
import IconFont from '@src/config/Iconfont';
//引入侧边栏得菜单
import menusider from "@src/config/Menu.config"
import {  Link } from 'react-router-dom';
//引入主页需要的菜单对应的页面
import { contentRouteConfig } from '@src/routes/route.config'
//引入路由跳转  react-router-dom
import { useLocation } from 'react-router';
import renderRoutes from '@src/utils/renderRoutes';
const { SubMenu } = Menu;
function BsicLayout() {
  // const params = useParams() //获取动态路由得值
  const location = useLocation()
  const [openkes,setopenkeys] = useState([])

  //监听路由变化，根据路由变化来改变页面切换

  useEffect(() => {

    //默认选中项
    
  }, [location.pathname])
  //选中的函书
 const onOpenChange = (values:any) => {
   setopenkeys(values)
 }
  //乾坤大挪移下半部分
  function renderMenu(data: MenuInfo) {
    let menuItem: JSX.Element
    if (data.children) {
      menuItem = (
        <SubMenu
          key={data.path}
          icon={data.icon && <IconFont type={data.icon}></IconFont>}
          title={data.text}
        >
          {/* 将有儿子得跑回去继续进行循环操作 */}
          {creteMenu(data.children)}
        </SubMenu>
      )
    } else {
      menuItem = (
        <Menu.Item key={data.path}>
          <Link to={data.path} >
            {
              data.icon ? <IconFont type={data.icon} /> : null
            }
            <span> {data.text} </span>
          </Link>


        </Menu.Item>
      )
    }
    return menuItem;
  }
  //渲染左侧菜单
  // data代表 传入左侧需要的文件数组
  function creteMenu(data: MenuInfo[]) {
    let menu: JSX.Element[] = []
    //这里判断是否需要权限 （我称之为乾坤大挪移）
    const create = (data: MenuInfo[]) => {
      data.forEach((item) => {
        if (item.auth) { //这里是判断权限的位置

        } else {
          menu.push(renderMenu(item))
        }

      })
    }
    create(data)
    return menu
  }

  return (
    <Layout>
      <Layout.Header className='header'>
        <BsishHeader/>
        </Layout.Header>
      <Layout>
        <Layout.Sider collapsible={false} className='sider-style'>
          <Menu
            mode="inline" // 展开方式
            selectedKeys={[location.pathname.slice(10)]} //当前选中的菜单项 key 数组
            openKeys={openkes}                 //当前展开的 SubMenu 菜单项 key 数组
            onOpenChange={onOpenChange}         //SubMenu 展开/关闭的回调
          >
            {creteMenu(menusider)}
          </Menu>
        </Layout.Sider>
        <Layout.Content className='content'> 
          {renderRoutes(contentRouteConfig)}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default BsicLayout