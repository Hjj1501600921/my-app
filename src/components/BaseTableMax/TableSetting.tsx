import { SettingOutlined } from "@ant-design/icons";
import { useMount } from "@umijs/hooks";
import { Checkbox, Popover, Tooltip } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group"; //按需加载 拿到checkbox的ts类型
import React, { useEffect, useState } from "react";

interface ColumnsState {
  checkedList: any[];
  indeterminate: boolean;
  checkAll: boolean;
}
export default function TableSetting(props: any) {
  const [visible, setvisible] = useState<boolean>(false);
  const [state, setstate] = useState<ColumnsState>({
    checkedList: [],
    indeterminate: true,
    checkAll: false,
  });

  //第一次进入加载
  useMount(() => {
    const checkedList: any[] = [];
    props.options?.map((item: any) => checkedList.push(item.key));
    setstate({
      checkedList: checkedList,
      indeterminate: false,
      checkAll: true,
    });
  });

  useEffect(() => {
    props.onColumnsChange(state.checkedList);
  }, [props, state.checkedList]);

  //全选的时候
  function onCheckAllChange(e: any) {
    const checkedList: any[] = [];
    props.options.map((item: any) => checkedList.push(item.key));
    setstate({
      checkedList: e.target.checked ? checkedList : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }

  // 列设置，改变时
  function onChange(checkedList: CheckboxValueType[]) {
    setstate({
      checkedList: checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < props.options.length,
      checkAll: checkedList.length === props.options.length,
    });
  }
  // 列设置，重置时
  function onReset() {
    const checkedList: any[] = [];
    props.options.map((item: any) => checkedList.push(item.key));
    setstate({
      checkedList: checkedList,
      indeterminate: false,
      checkAll: true,
    });
  }

  const title = (
    <div>
      <Checkbox
        indeterminate={state.indeterminate}
        onChange={onCheckAllChange}
        checked={state.checkAll}
      >
        全选
      </Checkbox>
      <span className="resetSpan" onClick={onReset}>
        重置
      </span>
    </div>
  );

  const content = (
    <Checkbox.Group value={state.checkedList} onChange={onChange}>
      {props.options?.map((item: any, index: any) => (
        <div key={index}>
          <Checkbox value={item.key} key={index}>
            {item.title}
          </Checkbox>
        </div>
      ))}
    </Checkbox.Group>
  );
  return (
    <Popover
      title={title}
      trigger="click"
      content={content}
      placement="bottomRight"
      visible={visible}
      arrowPointAtCenter
      onVisibleChange={(visible: boolean) => setvisible(visible)}
    >
      <Tooltip title="列设置">
        <SettingOutlined />
      </Tooltip>
    </Popover>
  );
}
