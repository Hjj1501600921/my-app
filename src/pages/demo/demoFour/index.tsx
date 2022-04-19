import React from "react";
import BaseTableMax from "@src/components/BaseTableMax"
export default function DemoFour () {
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