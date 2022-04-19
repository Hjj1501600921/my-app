
import { createStore, applyMiddleware, combineReducers } from "redux"
import redux1 from "@src/pages/demo/service"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; //中间件
//创建一个 Redux store 来以存放应用中所有的 state。应用中应有且仅有一个 store。
//combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。 


const reduxDemo =  combineReducers({
  reduxDemo:redux1
})

const store = createStore(reduxDemo, composeWithDevTools(applyMiddleware(thunk)))


export default store
