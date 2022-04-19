import React, { useEffect, useState } from "react";
import { TableProps } from "antd/lib/table";
import "./index.less";
import { Divider, Space, Tooltip, Table } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import TableSetting from "./TableSetting";

interface BaseTableProps<RecordType> extends TableProps<RecordType> {
  onRefresh: any | Function; // 表格刷新调用方法
  rightExtra?: React.ReactNode; // 头部 右边内容
  leftExtra?: React.ReactNode; // 头部 左边内容
}
export default function BaseTable(props: BaseTableProps<any>) {
  const {
    onRefresh,
    rightExtra,
    leftExtra,
    columns,
    pagination,
    ...tableProps   //运用展开运算符表示可以传多个参数
  } = props;
  // 真实的列
  const [realColumns, setrealColumns] = useState<any[]>([]);
  // 控制当前要显示的列
  const [columnsKey, setcolumnsKey] = useState<any[]>([]);
 // 当列变化的时候
  function onColumnsChange(checkedList: any[]) {
    setcolumnsKey(checkedList);
  }
  //监听变化
  useEffect(() => {
    columns &&
      setrealColumns(
        // 拿到所有的数据通过过滤来找到存在的数据
        columns.filter((item) => columnsKey.indexOf(item.key) !== -1)
      );
  }, [columnsKey, columns]);

  return (
    <div className="baseTable">
      <div className="baseTable-top">

        {/* 如果左边头部存在的话，那么就按照这个样式进行加载 */}
        {leftExtra && <div className="baseTable-top-left">{leftExtra}</div>} 

        <div className="baseTable-top-right">
          {rightExtra}
          <Space split={<Divider type="vertical" />} className="barIcon">
            <Tooltip title="刷新">
              <ReloadOutlined onClick={props.onRefresh} />
            </Tooltip>
            

            <TableSetting
              // 接受a页面传过来的数据并且传给c
              options={props.columns}
              // 同时传递一个函数过去来接收经过处理的数据
              onColumnsChange={onColumnsChange}
            />

          </Space>
        </div>
      </div>
      <Table
        {...tableProps}
        columns={realColumns}
        pagination={{
          ...pagination,
          showTotal: (total: number) => <div>{`总计 ${total} 条 `}</div>,
        }}
      />
    </div>
  );
}
