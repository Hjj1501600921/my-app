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
    console.log(item.color)
  }
  proObj({})
  
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);
return (
  <>111</>
)
}

export default NewDemoFive