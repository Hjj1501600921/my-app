import React from "react";
function NewDemoFive () {
  interface LabelledValue {
    label: string;
  }
  
  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  }
  
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);
return (
  <>111</>
)
}

export default NewDemoFive