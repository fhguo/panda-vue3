import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
// 1.创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

// 2.添加请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore();
  // console.log(userStore.token);
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  return config;
});

// 3.添加响应拦截器
request.interceptors.response.use(
  (res) => {
    // 简化数据
    return res.data;
  },
  (err) => {
    // 处理错误信息
    let msg = "";
    const status = err.response.status;
    console.log(err.response.status);

    switch (status) {
      case 401:
        msg = "TOKEN过期";
        break;
      case 403:
        msg = "无权限访问";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器错误";
        break;
      default:
        msg = "网络错误";
    }
    ElMessage({
      type: "error",
      message: msg,
    });
    // 失败回调
    return Promise.reject(err);
  },
);

// 4.导出request
export default request;
