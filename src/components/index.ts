// 引入项目全部的全局组件
import SvgIcon from "./SvgIcon/index.vue";
import type { App, Component } from "vue";
// 引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 定义全局对象 是一个键值对的集合，其中键是字符串，值是Vue组件类型Component
const allGlobalComponent: { [name: string]: Component } = { SvgIcon };

// 对外暴露插件对象
export default {
  install(app: App) {
    // 遍历allGlobalComponent对象
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册项目的全局组件
      app.component(key, allGlobalComponent[key]);
    });
    // 将element-plus提供的全部图标组件注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
