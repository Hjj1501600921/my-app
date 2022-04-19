import React from "react";
import BaseTable from "@src/components/BaseTable";
export default function DemoThree () {
  //自己封装的表格
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name:any) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
  return (
    <div> 
      <BaseTable 
      columns = {columns}
      />
    </div>
  )
}