import { createRouter, createWebHashHistory } from "vue-router";
// 导入路由数组
import { constantRouter } from "./routers";
// 创建路由器
const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: constantRouter,
  // 滚动行为
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

export default router;
