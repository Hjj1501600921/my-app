import React from "react"
import UserInfo from "./UserInfo"

function BsishHeader() {

  return (
    //这是单纯左边得部分
    <div className="header-style">
      <div className="title" >
        <h2>农业后台管理系统</h2>
      </div>
      {/* 这是右边退出的部分 */}
      <div className="userSign">
        <UserInfo></UserInfo>
      </div>
    </div>
  )
}

export default BsishHeader