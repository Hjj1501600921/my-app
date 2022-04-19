import React, { useState } from "react";
import "video-react/dist/video-react.css"
import './index.less'
import BaseTableMax from "@src/components/BaseTableMax"
function DemoFive() {
  const columns: any[] = [
    {
      key: "blacklistName",
      dataIndex: "blacklistName",
      title: "人员姓名",
      align: "center",
    },

    {
      key: "blacklistCard",
      dataIndex: "blacklistCard",
      title: "身份证",
      align: "center",
    },

    {
      key: "blacklistTime",
      dataIndex: "blacklistTime",
      title: "变更时间",
      align: "center",
    },

    {
      key: "operation",
      title: "操作",
      align: "left",
      reder: () => {
        return 1111
      }
    },
  ];
  return (
    <>
      <BaseTableMax
        onRefresh={() => {

        }}
        columns={columns} // table标题传入
      />
    </>
  )
}


export default DemoFive