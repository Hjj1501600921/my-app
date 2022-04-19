import React, { useEffect, useState } from "react";
import service from "@src/utils/request/axios/request";
import axios from "axios"
import { Table } from "antd";
export default function DemoTwo() {
//自己写的简单接口的交互
  const [cloumn, setcloumn] = useState([])
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'naem',
      key: 'naem',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '爱好',
      dataIndex: 'love',
      key: 'address',
    },
    {
      title: '速度',
      dataIndex: 'run',
      key: 'address',
    },
  ];

  function getList() {

    service.post('/getTableList').then(
      res => {
        console.log(res)
        setcloumn(res.data.data || [])
      },
      error => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <Table dataSource={cloumn} columns={columns} bordered />;
    </div>
  )
}