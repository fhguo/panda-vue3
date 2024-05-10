<template>
  <template v-for="item in menulist" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRouter">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有且只有一个子路由 -->
    <template v-else-if="item.children && item.children.length == 1">
      <el-menu-item v-if="!item.meta.hidden" :index="item.children[0].path" @click="goRouter">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多个子路由 -->
    <template v-else>
      <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menulist="item.children"></Menu>
      </el-sub-menu>
    </template>

  </template>
</template>

<script setup lang="ts">
defineProps(['menulist'])
import { useRouter } from 'vue-router';
let $router = useRouter();
const goRouter = (vc: any) => {
  // console.log(vc.index);
  $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  // 引入递归组件名
  name: 'Menu'
}
</script>

<style scoped></style>