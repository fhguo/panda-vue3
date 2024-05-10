<template>
  <el-drawer v-model="layoutStore.layoutSet" title="布局设置" size="290px">

    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon>
        <ColdDrink />
      </el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker v-model="color" @change="changeColor" show-alpha :predefine="predefineColors" />
    </div>
    <div class="theme-item">
      <span>暗黑模式</span>
      <el-switch v-model="layoutStore.isDark" inline-prompt @change="changeDark" :active-icon="Sunny" :inactive-icon="Moon" />
    </div>

    <!-- 界面设置 -->
    <el-divider class="divider divider-1" content-position="center">
      <el-icon>
        <Setting />
      </el-icon>
      界面设置
    </el-divider>
    <div class="theme-item">
      <span>菜单折叠</span>
      <el-switch v-model="layoutStore.fold" @change="changeCollapse" />
    </div>
    <div class="theme-item">
      <span>设置页脚</span>
      <el-switch v-model="isFooter" @change="changeFooter" />
    </div>
    <div class="theme-item">
      <span>面包屑导航</span>
      <el-switch v-model="breadcrumb" @change="changeBreadcrumb" />
    </div>
    <div class="theme-item">
      <span>面包屑图标</span>
      <el-switch v-model="breadcrumbIcon" @change="changeBreadcrumbIcon" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useLayoutStore from '@/store/modules/setting.ts';
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useDark, useToggle } from '@vueuse/core';
// 获取layout组件仓库
let layoutStore = useLayoutStore();
// 主题颜色设置
let color = ref('rgba(255, 69, 0, 0.68)')
let isFooter = ref(true);
let breadcrumb = ref(true);
let breadcrumbIcon = ref(true);

const changeColor = () => {
  console.log(color.value);
}
//switch开关的chang事件进行暗黑模式的切换
const isDark = useDark()
const changeDark = useToggle(isDark)

// const changeDark = () => {
//     //获取HTML根节点
//     let html = document.documentElement;
//     //判断HTML标签是否有类名dark
//     mode.value ? html.className = 'dark' : html.className = '';
// }
const changeCollapse = (val) => {
  if (val) {
    layoutStore.fold = true;
  } else {
    layoutStore.fold = false;
  }
}
const changeFooter = (val) => {
  if (!val) {
    layoutStore.showFooter = false;
  } else {
    layoutStore.showFooter = true;
  }
}
const changeBreadcrumb = (val) => {
  if(!val) {
    layoutStore.isBreadcrumb = false;
  }else {
    layoutStore.isBreadcrumb = true;
  }
}
const changeBreadcrumbIcon = (val) => {
  if(!val) {
    layoutStore.isBreadcrumbIcon = false;
  }else {
    layoutStore.isBreadcrumbIcon = true;
  }
}
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  '#c7158577',
])


</script>

<style scoped lang="scss">
.divider {
  margin-top: 15px;

  .el-icon {
    position: relative;
    top: 2px;
    right: 5px;
    font-size: 15px;
  }
}

.divider-1 {
  margin-top: 50px;
}

.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  margin: 14px 0;

  span {
    display: flex;
    align-items: center;
    font-size: 14px;

    .el-icon {
      margin-left: 3px;
      font-size: 15px;
      color: var(--el-text-color-regular);
      cursor: pointer;
    }
  }
}

.layout-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 7px 0;

  .layout-item {
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    transition: all 0.2s;

    .layout-dark {
      background-color: var(--el-color-primary);
      border-radius: 3px;
    }

    .layout-light {
      background-color: var(--el-color-primary-light-5);
      border-radius: 3px;
    }

    .layout-content {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
    }

    .el-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: var(--el-color-primary);
      transition: all 0.2s;
    }

    &:hover {
      box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
    }
  }

  .is-active {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }

  .layout-vertical {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .layout-dark {
      width: 20%;
    }

    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;

      .layout-light {
        height: 20%;
      }

      .layout-content {
        height: 67%;
      }
    }
  }

  .layout-classic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;

    .layout-dark {
      height: 22%;
    }

    .layout-container {
      display: flex;
      justify-content: space-between;
      height: 70%;

      .layout-light {
        width: 20%;
      }

      .layout-content {
        width: 70%;
      }
    }
  }

  .layout-transverse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;

    .layout-dark {
      height: 20%;
    }

    .layout-content {
      height: 67%;
    }
  }

  .layout-columns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    .layout-dark {
      width: 14%;
    }

    .layout-light {
      width: 17%;
    }

    .layout-content {
      width: 55%;
    }
  }
}
</style>