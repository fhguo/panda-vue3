<template>
  <div class="tabbar">
    <div class="tab-left">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="tab-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue';
import Setting from './setting/index.vue';
</script>

<script lang="ts">
export default {
  name: "Tabbar"
}
</script>
<style lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tab-left {
    display: flex;

    .change-icon {
      margin-right: 15px;
      cursor: pointer;
    }

    .menu-icon {
      margin-right: 5px;
    }

    .el-breadcrumb__inner{
      display: flex;
      justify-content: center;
    }
  }

  .tab-right {
    display: flex;
    align-items: center;
    margin-right: 0px;
    line-height: 50px;

    .el-avatar {
      margin: 0 5px 0 10px;
    }

    .name {
      color: #666;
    }

    .el-badge {
      margin: 0 10px;
      height: 30px;
      display: flex;
      align-items: center;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>