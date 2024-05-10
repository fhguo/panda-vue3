// 统一管理用户相关的接口
import request from "@/utils/request";
import type { loginForm, loginResponseData } from "./type";
// 枚举接口
enum API {
  LOGIN_URL = "user/login",
  LOGININFO_URL = "user/info",
}

// 登录接口
// any:函数的返回类型 loginResponseData:参数类型
// 必须写return
export const login = (data: loginForm) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data);
};

// 获取用户信息
export const getUserInfo = () => {
  return request.get(API.LOGININFO_URL);
};
