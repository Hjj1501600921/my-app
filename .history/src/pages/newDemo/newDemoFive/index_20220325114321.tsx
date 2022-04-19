import React from "react";
function NewDemoFive () {
  interface LabelledValue {
    label: string;
  }

  interface SquareConfig {
    color: string;
    width: number;
    [propName: string]: any;
}
  
  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj);
  }
  function proObj (item:SquareConfig) {
    console.log(item)
  }
  proObj({color:'red',width:20,name:'砖头',age:"18",like:'爆头'})
  
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);
return (
  <>111</>
)
}

export default NewDemoFive