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
  
  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj);
  }
  function proObj (item:SquareConfig) {
    console.log( item.name +'是'+ item.color+'他的作用是'+item.like)
  }
  proObj({color:'红色的',width:20,name:'砖头',age:"18",like:'爆头'})
  
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);
return (
  <>这个页面主要是ts得一些补充知识</>
)
}

export default NewDemoFive