// 导出静态路由
export const constantRouter = [
  {
    // 登录
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login", // 命名路由
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    // 首页
    path: "/",
    component: () => import("@/views/layout/index.vue"),
    name: "layout", // 命名路由
    redirect: "/home",
    meta: {
      title: "",
      hidden: false,
      icon: "HomeFilled",
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    // 404
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404", // 命名路由
    meta: {
      title: "404",
      hidden: true,
    },
  },
  {
    // 数据大屏
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "screen",
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "PieChart",
    },
  },
  {
    // 主数据模块
    path: "/data",
    component: () => import("@/views/layout/index.vue"),
    name: "data",
    meta: {
      title: "主数据模块",
      hidden: false,
      icon: "Histogram",
    },
    children: [
      {
        path: "/data/list",
        component: () => import("@/views/data/list/index.vue"),
        name: "dataList",
        meta: {
          title: "主数据管理",
          hidden: false,
          icon: "Histogram",
        },
      },
      {
        path: "/data/material",
        component: () => import("@/views/data/material/index.vue"),
        name: "material",
        meta: {
          title: "物料管理",
          hidden: false,
          icon: "Memo",
        },
      },
      {
        path: "/data/store",
        component: () => import("@/views/data/store/index.vue"),
        name: "store",
        meta: {
          title: "仓库管理",
          hidden: false,
          icon: "Refrigerator",
        },
      },
    ],
  },

  {
    // 权限管理
    path: "/acl",
    component: () => import("@/views/layout/index.vue"),
    name: "acl",
    redirect: "/acl/user",
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "user",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "Avatar",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "role",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/acl/depart",
        component: () => import("@/views/acl/depart/index.vue"),
        name: "depart",
        meta: {
          title: "部门管理",
          hidden: false,
          icon: "Medal",
        },
      },
    ],
  },
  {
    // 上面路由都没匹配
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
    meta: {
      title: "其它",
      hidden: true,
    },
  },
];
