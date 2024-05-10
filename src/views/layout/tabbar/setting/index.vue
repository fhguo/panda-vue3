<template>
  <el-button circle icon="Refresh" @click="updateRefresh"></el-button>
  <el-button circle icon="FullScreen" @click="fullScreen"></el-button>
  <!-- 通知 -->
  <Notice></Notice>
  <el-button circle icon="Setting" @click="setDrawer"></el-button>
  <el-dropdown trigger="click">
    <div class="el-dropdown-link" @click="dropLink">
      <el-avatar :size="24" :src="userStore.avatar" />
      <span class="name">{{ userStore.username }}</span>
      <el-icon class="el-icon--right">
        <component :is="!linkFlag ? 'arrow-down' : 'arrow-up'"></component>
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="exit" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import useLayoutStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import Notice from './notice.vue';
let layoutStore = useLayoutStore();
let userStore = useUserStore();
// 获取路由器对象
let $router = useRouter();
// 获取路由信息对象
let $route = useRoute();
let linkFlag = ref(false);
const dropLink = () => {
  linkFlag.value = !linkFlag.value;
}
// 设置操作
const setDrawer = () => {
  layoutStore.layoutSet = true;
}
// 刷新操作
const updateRefresh = () => {
  layoutStore.refresh = !layoutStore.refresh;
}
// 点击全屏按钮
const fullScreen = () => {
  // 当前页面是否全屏
  let full = document.fullscreenElement;
  if (!full) {
    // 实现全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
}
// 查看消息
const notice = () => {

}
// 退出登录
const exit = () => {
  userStore.userLogout();
  // $router.push('/login');
  //跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } });
}
</script>
<script lang="ts">
export default {
  name: "Setting"
}
</script>

<style scoped lang="scss"></style>