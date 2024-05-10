// 用户相关仓库
import { defineStore } from "pinia";
// 引入接口
import { login, getUserInfo } from "@/api/user";
// 引入数据类型
import type { loginForm, loginResponseData } from "@/api/user/type";
// 引入静态路由
import { constantRouter } from "@/router/routers";
// 创建用户仓库
const useUserStore = defineStore("User", {
  // 存储数据的地方
  state: () => {
    return {
      token: localStorage.getItem("Token") || "",
      menuRouters: constantRouter, // 菜单路由数组
      username: "", // 用户名
      avatar: "", // 头像
    };
  },
  // 异步/逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      const result: loginResponseData = await login(data);
      if (result.code == 200) {
        this.token = result.data.token;
        localStorage.setItem("Token", result.data.token);
        return "OK";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    // 获取用户信息的方法
    async getUser() {
      const result: any = await getUserInfo();
      console.log(result);
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
        return "ok";
      } else {
        return Promise.reject("用户登录过期，请重新登录！");
      }
    },
    // 退出登录的方法
    userLogout() {
      // 清除用户信息
      this.token = "";
      this.username = "";
      this.avatar = "";
      localStorage.removeItem("Token");
    },
  },
});

// 默认导出
export default useUserStore;
