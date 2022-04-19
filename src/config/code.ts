//这是和后端约定好的响应码
const code = {
  SUCCESS: 1000, // 成功的状态码
  HANDLE_ERROR: 1001, // 操作错误的状态码
  PARAMS_ERROR: 1002, // 参数校验错误
  TOKEN_ERROR: 1003, // 认证过期
  NO_PERMISSION: 1004, // 没有权限
};

export default code;
