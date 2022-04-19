import { Avatar } from "antd"
import React from "react"
import { message } from "antd"
import { useNavigate } from "react-router"

//这是右侧导航包括推出的逻辑编写
function UserInfo() {
  const navigate = useNavigate()
  const signClick = () => {
    //点击退出
      navigate('/login')
    message.success("退出成功")
  }

  return (
    <div className="sign" >
      <Avatar
        style={{ marginRight: 10 }}
        src={require('../asstes/iamages/watamelen.jpg')}
      />
      <div onClick={signClick}>
        安全退出
      </div>
    </div>
  )
}

export default UserInfo