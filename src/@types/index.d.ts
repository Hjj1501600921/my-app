declare module "slash2";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.xlsx";
declare module "braft-extensions/dist/table";
declare module "braft-utils";
declare module "jsencrypt";
declare module 'qs'
declare module 'video-react'
declare module 'trtc-calling-js' //腾讯音视频
//  路径权限和标题的ts
interface MenuInfo {
  text: string
  icon?: string
  path: string
  auth?:Array<string>;
  children?: menuInfo[];
}
//route config   ts文件
interface RouteConfig {
  // 这个位置一定要传入RouteComponentProps
  element:| React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;
  path:string
  exact?:boolean
  strict?:boolean //是否启用严格模式
}
// redux action 的类型
interface ActionType {
  type:boolean,
  payload:any
}

//select 下拉框的数据类型

interface SelectType {
  label:string
  value:string | number
}

// redux 的类型

interface ReduxInfo {
  reduxDemo:Array<SelectType>
}
// 全局返回参数信息
interface FetchData {
  rstCode: number;
  rstMsg: string;
  data: any;
}