// 路由鉴权
import router from "./index.ts";
// 引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// 导入用户仓库获取token
import useUserStore from "@/store/modules/user.ts";
import pinia from "@/store/index.ts";
import { ElNotification } from "element-plus";
// 去除小圆圈
nprogress.configure({ showSpinner: false });

const userStore = useUserStore(pinia);

console.log(userStore);

const username = userStore.username;

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  console.log(to, from);
  nprogress.start();

  // 获取token 判断用户是否登录
  const token = userStore.token;
  console.log(token);

  if (token) {
    if (to.path == "/login") {
      next("/");
    } else {
      // 是否有用户信息
      if (username) {
        // 有就放行
        next();
      } else {
        // 获取用户信息
        userStore
          .getUser()
          .then(() => {
            next();
          })
          .catch((err) => {
            // token过期 退出登录
            ElNotification({
              type: "error",
              message: err,
            });
            userStore.userLogout();
            next("/login");
          });
      }
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});
// 全局后置钩子
router.afterEach(() => {
  // to and from are both route objects.
  nprogress.done();
});
