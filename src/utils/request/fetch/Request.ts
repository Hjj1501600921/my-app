import fetch from "cross-fetch";
import code from "@src/config/code";
import config from "@src/config/config";
//状态响应码
const codeMessage: any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};
//登录的操作
export function loginRequest(url: string, params: any) {
  return Promise.race([
    fetch(url, {
      method: "post",
      body: JSON.stringify(params),
      mode: "cors",
      headers: {
        "Accept-type": "application/json",
        "Content-type": "application/json;charset=utf-8",
      },
    }),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error("请求超时")), 200000);
    }),
  ])
    .then(checkStatus)
    .then((res) => {
      const authentication = res.headers.map.authentication;
      window.sessionStorage.setItem(config.sessionPath, authentication);
      return res.json();
    })
    .then(checkCode);
}

// post请求
export function fetchRequest(url: string, params: any) {
  //选择把token存储到本地
  const infoToken = window.sessionStorage.getItem(config.sessionPath);
  return Promise.race([
    fetch(url, {
      method: "post",
      body: JSON.stringify(params),
      mode: "cors",
      headers: {
        "Accept-type": "application/json",
        "Content-type": "application/json;charset=utf-8",
        Authentication: infoToken === null ? "" : infoToken,
      },
    }),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error("请求超时")), 200000);
    }),
  ])
    .then(checkStatus)
    .then((res) => {
      return res.json();
    })
    .then(checkCode);
}

// get请求
export function fetchRequestGet(url: string) {
  const infoToken = window.sessionStorage.getItem(config.sessionPath);
  return Promise.race([
    fetch(url, {
      method: "get",
      headers: {
        Authentication: infoToken === null ? "" : infoToken,
      },
    }),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error("请求超时")), 200000);
    }),
  ])
    .then(checkStatus)
    .then((res) => res.json())
    .then(checkCode);
}
//下载的操作
export function downloadRequest(url: string, params: any) {
  const infoToken = window.sessionStorage.getItem(config.sessionPath);
  return Promise.race([
    fetch(url, {
      method: "post",
      body: JSON.stringify(params),
      mode: "cors",
      headers: {
        "Accept-type": "application/json",
        "Content-type": "application/json;charset=utf-8",
        Authentication: infoToken === null ? "" : infoToken,
      },
    }),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error("请求超时")), 200000);
    }),
  ])
    .then(checkStatus)
    .then(checkfile);
}

//下载的操作
export function downloadRequestGet(url: string) {
  const infoToken = window.sessionStorage.getItem(config.sessionPath);
  return Promise.race([
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Accept-type": "application/json",
        "Content-type": "application/json;charset=utf-8",
        Authentication: infoToken === null ? "" : infoToken,
      },
    }),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error("请求超时")), 200000);
    }),
  ])
    .then(checkStatus)
    .then(checkfile);
}

//检查返回的状态
function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const error = new Error(errorText);
    throw error;
  } else if (!response) {
    const errorText = "您的网络发生异常,无法连接服务器";
    const error = new Error(errorText);
    throw error;
  }
  return response;
}

//检查返回的code
function checkCode(json: FetchData) {
  switch (json.rstCode) {
    case code.SUCCESS:
      return json;
    case code.TOKEN_ERROR:
      window.location.hash = `#${config.baseName}/nologin`;
      throw new Error(json.rstMsg);
    case code.NO_PERMISSION:
      window.location.hash = `#${config.baseName}/homepage/nopermission`;
      throw new Error(json.rstMsg);
    default:
      throw new Error(json.rstMsg);
  }
}

//检查文件下载是否正确
async function checkfile(res: any) {
  let data = { ...res };
  try {
    const json = await data.json();
    // 如果返回json,则可能出错
    if (json) {
      switch (json.rstCode) {
        case code.SUCCESS:
          break;
        case code.TOKEN_ERROR:
          window.location.hash = `#${config.baseName}/nologin`;
  
          break;
        default:
      }
      throw new Error(json.rstMsg);
    }
  } catch (error) {
    const fileExist = decodeURI(res.headers.map.fileExist);
    if (fileExist === "no") {
      throw new Error("文件不存在或已删除!");
    }
    const filename = decodeURI(res.headers.map.filename);
    const blob = await res.blob();
    return { filename: filename, blob: blob };
  }
  throw new Error();
}
