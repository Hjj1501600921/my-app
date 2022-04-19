
import {Table} from "antd"
import React from "react"

function BaseTable (props:any) {
 const {
    columns,
    dataSource,
    pagination,

   } = props
 

  return (
    <>
    <Table bordered
     columns={columns} 
     dataSource={dataSource}
     pagination={pagination}
    />
    </>
  )
}

export default BaseTable