import React, { Children, useEffect, useState } from "react"
import service from "@src/utils/request/axios/request"
import { Tree, Input } from 'antd';
// 可拖拽树形插件
function DemoSix() {
  //树型控件的基本数据
  
  const [data, setData] = useState<any>([]); // 树形 数据
  const [expandedKeys, setExpandedKeys] = useState([]); // 展开的key值
  const [autoExpandParent, setAutoExpandParent] = useState(false); // 是否自动展开父节点
  const [checkedKeys, setCheckedKeys] = useState([]); // 选中的key
  const [searchValue, setSearchValue] = useState(""); // 搜索的值
  const [searchTreeKey, setSearchTreeKey] = useState([]); // 搜索得key
  const { Search } = Input;
  const {TreeNode} = Tree
  //搜索的函数
  // 首先处理拿到的数据 递归函数就行了
  function treeData(data: any[]) {
    const newarr: any[] = data.map((item: any) => {
      const newobj: any = {
        title: item.name,
        key: item.value,
        value: item.value
      }
      if (item.children) {
        newobj.children = treeData(item.children)
      }
      return newobj
    })
    console.log(newarr)
    return newarr
  }
  useEffect(() => {
    service.post('/getTree').then((res: any) => {
      console.log(res.data.data)
      setData(treeData(res.data.data))
    })

  }, [])

  useEffect(()=>{
    expandedKeysFn();
    setData(addParentKeyWrapper(data));
},[])
const addParentKeyWrapper = (tree:any) => {
    //深度克隆
    const data = JSON.parse(JSON.stringify(tree));
    function addParentKey(data:any, parentKey:any) {
        data.forEach((ele:any) => {
            const { children, key } = ele;
            ele.parent_key = parentKey;
            if (children) {//如果唯一标识不是code可以自行改变
                addParentKey(children, key)
            }
        })
    }
    addParentKey(data, null); //一开始为null,根节点没有父级
    return data;
}

const onChange = (e:any):any => { //search变化
    const { value } = e.target;
    console.log(value)
    const dataList:any = [];
    if (value) {
        const generateList = (data:any) => { //tree树片扁平化
            for (let i = 0; i < data.length; i++) {
                const node = data[i];
                const { key, title, parent_key } = node;
                dataList.push({ key, title: title, parent_key: parent_key }); //根据自己的数据更换parent_key代表父级key
                if (node.children) {
                    generateList(node.children);
                }
            }
        };
        generateList(data);

        const getParentKey = (key:any, tree:any):any => { //获取父元素可以
            let parentKey;
            for (let i = 0; i < tree.length; i++) {
                const node = tree[i];
                if (node.children) {
                    if (node.children.some((item:any) => item.key === key)) {
                        parentKey = node.key;
                    } else if (getParentKey(key, node.children)) {
                        parentKey = getParentKey(key, node.children);
                    }
                }
            }
            return parentKey;
        };

        const expandedKeys = dataList
            .map((item:any) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, data);
                }
                return null;
            })
            .filter((item:any, i:number, self:any) => item && self.indexOf(item) === i);

        setExpandedKeys(expandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    } else {
        expandedKeysFn() //重置展开key
        setSearchValue(value);
        setAutoExpandParent(true);
    }
}


const renderTreeNode = (data:any) => { //生成树结构函数
    if (data.length == 0) {
        return
    }
    
    return data.map((item:any) => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
            index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: "red" }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : (
                <span>{item.title}</span>
            );
        if (item.children && item.children.length > 0) {
            //className={searchTreeKey.indexOf(item.key) > -1 ? styles.yes : styles.no}
            return <TreeNode title={title} key={item.key} >
                {
                    renderTreeNode(item.children)
                }
            </TreeNode>
        }
        return <TreeNode key={item.key} title={title}  ></TreeNode>
    })
}
const expandedKeysFn = () => {
    let arr:any = [];
    let loop = (data:any) => {
        data.map((item:any, index:number) => {
            arr.push(item.key);
            if (item.children && item.children.length > 0) {
                loop(item.children)
            }
        })
    }
    // loop(data); 这个会把数组push进去，让他自动站展开
    setExpandedKeys(arr);
   
}
const onExpand = (expandedKeys:any) => {
    console.log('onExpand', expandedKeys);
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
};
const onCheck = (checkedKeys:any) => {
    setCheckedKeys(checkedKeys);
}


  // 树型结构的配置
  const obpro: any = {
    treeData: data, // 树结构数据
    checkable:true,
    expandedKeys:expandedKeys, //默认展开的key
    onExpand:onExpand, //展开事件
    autoExpandParent:autoExpandParent, //是否自动展开父节点
    checkedKeys:checkedKeys, //选中的key
    onCheck:onCheck //选中事件
  }


  // 简单的树形控件

  return (
    <>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
      <Tree
        {...obpro}
      />
    </>
  )
}
export default DemoSix