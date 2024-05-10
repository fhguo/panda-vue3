<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="refreshFlag"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import useLayoutStore from '@/store/modules/setting';
let layoutStore = useLayoutStore();
let refreshFlag = ref(true);
// 监听是否刷新
watch(() => layoutStore.refresh, () => {
  refreshFlag.value = false;
  // DOM更新完毕
  nextTick(() => {
    refreshFlag.value = true;
  })
})
</script>
<script lang="ts">
export default {
  name: "Main"
}
</script>

<style scoped>

/* 动画效果 */
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all .3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>