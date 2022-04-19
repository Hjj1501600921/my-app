const  inite:SelectType[] = [
  {
    label:"四川",
    value:1
  },
  {
    label:"重庆",
    value:2
  },
  {
    label:"上海",
    value:3
  },
  {
    label:"北京",
    value:4
  },
] //定义state

  const demoType = {
    set_demo: Boolean()
  }

function reduxDemo (state:any = inite ,action:ActionType ) {
  
switch (action.type) {
  case demoType.set_demo:
    return {...state,agentList: action.payload }
  default:
    return state
}
}

export default reduxDemo