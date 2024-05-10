<template>
  <el-container>
    <!-- 左侧菜单 -->
    <el-aside :style="{ width: layoutStore.fold ? '65px' : '210px' }">
      <!-- 展示菜单 -->
      <div class="logo">
        <img :src="SetTitle.logo" alt="">
        <p v-show="!layoutStore.fold" class="title">{{ SetTitle.title }}</p>
      </div>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件-->
        <el-menu :default-active="$route.path" :collapse="layoutStore.fold" :collapse-transition="false">
          <!--根据路由动态生成菜单-->
          <Menu :menulist="userStore.menuRouters"></Menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <!-- 顶部导航 -->
      <el-header>
        <!-- layout组件的顶部导航tabbar -->
        <Tabbar></Tabbar>
      </el-header>
      <!-- 内容展示区域 -->
      <el-main>
        <Main></Main>
      </el-main>
      <el-footer v-show="layoutStore.showFooter">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>
  <!-- 设置抽屉组件 -->
  <Draw></Draw>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
//获取路由对象
import { useRoute } from 'vue-router';
import SetTitle from './setting.ts';
//引入菜单组件
import Menu from './menu/index.vue'
//右侧内容展示区域
import Main from './main/index.vue';
// 引入tabbar
import Tabbar from './tabbar/index.vue';
// 引入Drawer组件
import Draw from './draw/index.vue';
// 引入footer组件
import Footer from './footer/index.vue';
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
import useLayoutStore from '@/store/modules/setting.ts';
// 是否折叠菜单栏
let layoutStore = useLayoutStore();

let userStore = useUserStore();

//获取路由对象
let $route = useRoute();

onMounted(() => {
  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    const w = document.documentElement.clientWidth;
    // const h = document.documentElement.clientHeight;
    // console.log('页面大小发生了变化', `宽度：${w}`, `高度：${h}`);
    if (w <= 750) {
      layoutStore.fold = true;
    } else {
      layoutStore.fold = false;
    }
  });

})

</script>

<script lang="ts">
export default {
  name: "Layout"
}
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;

  .el-aside {
    height: 100vh;
    // background-color: #001529;
    // color: #fff;
    transition: width 0.3s;

    :deep(.el-menu-item.is-active) {
      color: var(--el-menu-active-color) !important;
      background-color: var(--el-menu-active-bg-color) !important;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - 50px);
    }

    .el-menu {
      border-right: none;
    }
  }

  .logo {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 32px;
    }

    .title {
      margin-left: 10px;
      font-size: 20px;
      white-space: nowrap; // 解决文字闪烁问题
    }
  }

  .el-container {
    border-left: 1px solid var(--card-border);

    .el-header {
      border-bottom: 1px solid var(--card-border);
    }
  }

  .el-main {
    background-color: var(--main-background);
  }

  .el-footer {
    height: unset;
    padding: 0;
  }
}
</style>