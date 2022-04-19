import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  MinusOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styles from './index.less';
const { TreeNode } = Tree;
 
const DragTable = () => {
  let data = [
    {
      value: '董事会',
      defaultValue: '董事会',
      key: '0-1',
      parentKey: '0',
      isEditable: false,
      children: [
        {
          value: '小白龙',
          defaultValue: '小白龙',
          key: '0-1-1',
          parentKey: '1-1',
          isEditable: false,
          children: [
            {
              value: '小红',
              defaultValue: '小红',
              key: '0-1-11',
              parentKey: '1-11',
              isEditable: false,
            },
            {
              value: '小绿',
              defaultValue: '小绿',
              key: '0-1-12',
              parentKey: '1-12',
              isEditable: false,
            },
            {
              value: '小青',
              defaultValue: '小青',
              key: '0-1-13',
              parentKey: '1-13',
              isEditable: false,
            },
          ],
        },
      ],
    },
    {
      value: '财务部',
      defaultValue: '财务部',
      key: '0-2',
      parentKey: '1',
      isEditable: false,
      children: [
        {
          value: '小红',
          defaultValue: '小红',
          key: '0-2-1',
          parentKey: '2-1',
          isEditable: false,
        },
        {
          value: '小绿',
          defaultValue: '小绿',
          key: '0-2-2',
          parentKey: '2-2',
          isEditable: false,
        },
        {
          value: '小青',
          defaultValue: '小青',
          key: '0-2-3',
          parentKey: '2-3',
          isEditable: false,
        },
      ],
    },
  ];
  let expandedKeyss = [];
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [treeData, setTreeData] = useState(data);
 
  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    expandedKeyss = expandedKeys;
    setExpandedKeys(expandedKeys);
  };
 
  const addNode = (key, data) =>
    data.map((item) => {
      if (item.key === key) {
        if (item.children) {
          item.children.push({
            value: 'default',
            defaultValue: 'default',
            key: key + Math.random(100), // 这个 key 应该是唯一的。 Tip: The key should be unique
            parentKey: key,
            isEditable: false,
          });
        } else {
          item.children = [];
          item.children.push({
            value: 'default',
            defaultValue: 'default',
            key: key + Math.random(100),
            parentKey: key,
            isEditable: false,
          });
        }
        return;
      }
      if (item.children) {
        addNode(key, item.children);
      }
    });
 
  const onAdd = (e) => {
    console.log('add');
    if (expandedKeys.indexOf(e) === -1) {
      expandedKeyss.push(e);
    }
    addNode(e, data);
    setExpandedKeys(expandedKeyss);
    setTreeData([...data])
  };
 
  const deleteNode = (key, data) =>
    data.map((item, index) => {
      if (item.key === key) {
        data.splice(index, 1);
        return;
      } else {
        if (item.children) {
          deleteNode(key, item.children);
        }
      }
    });
 
  const onDelete = (key) => {
    console.log('delete');
    deleteNode(key, data);
    setTreeData([...data])
  };
 
  const editNode = (key, data) =>
    data.map((item) => {
      if (item.key === key) {
        item.isEditable = true;
      } else {
        item.isEditable = false;
      }
      // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
      item.value = item.defaultValue;
      if (item.children) {
        editNode(key, item.children);
      }
    });
 
  const onEdit = (key) => {
    console.log('edit');
    editNode(key, data);
    setTreeData([...data])
  };
 
  const closeNode = (key, defaultValue, data) =>
    data.map((item) => {
      item.isEditable = false;
      if (item.key === key) {
        item.value = defaultValue;
      }
      if (item.children) {
        closeNode(key, defaultValue, item.children);
      }
    });
 
  const onClose = (key, defaultValue) => {
    console.log('close');
    closeNode(key, defaultValue, data);
    setTreeData([...data])
  };
 
  const saveNode = (key, data) =>
    data.map((item) => {
      if (item.key === key) {
        item.defaultValue = item.value;
      }
      if (item.children) {
        saveNode(key, item.children);
      }
      item.isEditable = false;
    });
 
  const onSave = (key) => {
    console.log('save');
    saveNode(key, data);
    setTreeData([...data])
  };
 
  const changeNode = (key, value, data) =>
    data.map((item) => {
      if (item.key === key) {
        item.value = value;
      }
      if (item.children) {
        changeNode(key, value, item.children);
      }
    });
 
  const onChange = (e, key) => {
    console.log('onchange');
    changeNode(key, e.target.value, data);
    setTreeData([...data])
  };
 
  const renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.isEditable) {
        item.title = (
          <div>
            <input
              className={styles.inputField}
              value={item.value}
              onChange={(e) => onChange(e, item.key)}
            />
            <MinusOutlined
              type="close"
              style={{ marginLeft: 20 }}
              onClick={() => onClose(item.key, item.defaultValue)}
            />
            <CheckOutlined
              type="check"
              style={{ marginLeft: 10 }}
              onClick={() => onSave(item.key)}
            />
          </div>
        );
      } else {
        item.title = (
          <div className={styles.titleContainer}>
            <span>{item.value}</span>
            <span className={styles.operationField}>
              <EditOutlined
                style={{ marginLeft: 20 }}
                type="edit"
                onClick={() => onEdit(item.key)}
              />
              <PlusOutlined style={{ marginLeft: 10 }} type="add" onClick={() => onAdd(item.key)} />
              {item.parentKey === '0' ? null : (
                <DeleteOutlined
                  style={{ marginLeft: 10 }}
                  type="edit"
                  onClick={() => onDelete(item.key)}
                />
              )}
            </span>
          </div>
        );
      }
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
 
  // 拖拽
  const DragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };
 
  const handleDrop = (info) => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
 
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
 
    const data = [...treeData];
 
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setTreeData([...data])
  };
 
  return (
    <div>
      <Tree
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        draggable
        onDrop={handleDrop}
        onDragEnter={DragEnter}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </div>
  );
};
 
export default DragTable;