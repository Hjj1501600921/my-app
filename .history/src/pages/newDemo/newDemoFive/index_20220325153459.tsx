
import React from "react";
function NewDemoFive() {
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
    (useName: string, passWord: string): boolean
  }

  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj);
  }
  function proObj(item: SquareConfig) {
    console.log(item.name + '是' + item.color + '他的作用是' + item.like)
  }
  proObj({ color: '红色的', width: 20, name: '砖头', age: "18", like: '爆头' })

  let myObj = { size: 10, label: "Size 10 Object" };
  printLabel(myObj);


  //类类型
  class Animal {
    // public 公有得
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }
  // private 私有的
  class Animal2 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
  }

  new Animal("Cat").name; // 错误: 'name' 是私有的.

  // protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
  class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
// let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.



  //函数类型

  function buildName(firstName: string, lastName = 222) {
    return firstName + " " + lastName;
}
console.log(buildName("bob",2222))

  let mySerch: searchFcun

  mySerch = (useName, passWord):boolean => {
    //search用来搜索字符串
    let result = useName.search(passWord);
    return result > -1;
  }

  return (
    <>这个页面主要是ts得一些补充知识</>
  )
}

export default NewDemoFive