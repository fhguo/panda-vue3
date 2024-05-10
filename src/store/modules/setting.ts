// layout组件仓库
import { defineStore } from "pinia";

const useLayoutStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false, // 控制菜单折叠收起
      refresh: false, // 控制刷新效果
      layoutSet: false, // 控制设置Drawer抽屉
      showFooter: true, // 控制页脚
      isBreadcrumb: true, // 控制面包屑导航
      isBreadcrumbIcon: true, // 控制面包屑图标
      isDark:
        localStorage.getItem("vueuse-color-scheme") == "dark" ? true : false, // 控制暗黑主题
    };
  },
});

export default useLayoutStore;
