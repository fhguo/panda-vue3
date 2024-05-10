<template>
  <el-icon class="change-icon" @click="changeIcon">
    <!-- 使用动态组件component渲染图标组件 -->
    <component :is="!layoutStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight" v-show="layoutStore.isBreadcrumb">
    <el-breadcrumb-item :to="item.path" v-for="item in $route.matched" v-show="item.meta.title">
      <el-icon class="menu-icon" v-show="layoutStore.isBreadcrumbIcon">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useLayoutStore from '@/store/modules/setting.ts';
import { useRoute } from 'vue-router';
let $route = useRoute();
// console.log(111, $route);

// 是否折叠菜单栏
let layoutStore = useLayoutStore();
// 折叠菜单栏
const changeIcon = () => {
  // 图标切换
  layoutStore.fold = !layoutStore.fold;
}
</script>
<script lang="ts">
export default {
  name: "Breadcrumb"
}
</script>

<style scoped lang="scss">
// 兼容移动设备 面包屑在移动端不显示
@media screen and (width <= 750px) {
  .el-breadcrumb {
    display: none;
  }
}

</style>