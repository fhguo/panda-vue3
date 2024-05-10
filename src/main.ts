import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 暗黑模式css变量
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/dark.scss";
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// svg插件配置代码
import "virtual:svg-icons-register";
// 引入全局样式文件
import "@/styles/index.scss";
// 引入路由文件
import router from "./router";
// 引入仓库
import pinia from "./store/index.ts";
// 引入路由鉴权文件
import "./router/permission.ts";

//获取应用实例对象
const app = createApp(App);
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
});
// 引入自定义插件对象：注册全局组件
import globalComponents from "@/components";
// 安装自定义插件
app.use(globalComponents);
app.use(router);
// 安装store仓库
app.use(pinia);
app.mount("#app");
