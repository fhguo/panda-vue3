<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // 属性值的前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  // svg图标的名字
  name: String,
  // svg图标的颜色
  color: {
    type: String,
    default: "",
  },
  // svg宽度
  width: {
    type: String,
    default: "16px",
  },
  // svg高度
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style scoped></style>
