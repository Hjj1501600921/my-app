import { stringify } from "querystring";
import React from "react";
function NewDemoFive () {
  interface LabelledValue {
    label: string;
  }
//字符串索引签名
  interface SquareConfig {
    color: string;
    width: number;
    [propName: string]: any;
}

interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

 //函数类型
 interface searchFcun {
   (useName:string,passWord:string):boolean
 }
  
  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj);
  }
  function proObj (item:SquareConfig) {
    console.log( item.name +'是'+ item.color+'他的作用是'+item.like)
  }
  proObj({color:'红色的',width:20,name:'砖头',age:"18",like:'爆头'})
  
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);


  //类类型
  interface ClockInterface {
    currentTime: Date;
}

  //函数类型

  let mySerch:searchFcun

  mySerch = (useName,passWord) => {
    //search用来搜索字符串
    let result = useName.search(passWord);
    return result > -1;
  }

  console.log(mySerch('1234','123224'))
  
return (
  <>这个页面主要是ts得一些补充知识</>
)
}

export default NewDemoFive