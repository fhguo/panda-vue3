<template>
  <div class="home">
    <img src="@/assets/images/welcome.png" alt="">
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  // userStore.getUser()
})
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  >img {
    width: 75%;
    max-width: 1200px
  }
}
</style>  