// 登录接口携带参数ts类型
export interface loginForm {
  username: string;
  password: string;
}

interface dataType {
  message: string | undefined;
  token: string;
}

// 登录接口返回数据类型
export interface loginResponseData {
  code: number;
  data: dataType;
}

// 定义用户信息相关的数据类型
// 省略
