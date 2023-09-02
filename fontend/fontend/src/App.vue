<template>
  <div>
    <template v-if="$route.name !== 'login'">
      <header class="header">
        <NavBar />
      </header>
      <!-- 使用TheLayout组件的原因是因为内容有版心，并不是占据页面全部部分 -->
      <TheLayout>
        <router-view></router-view>
      </TheLayout>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
    <footer class="footer" :class="{ inside: $route.name === 'login' }">
      &copy;QT-7274. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import TheLayout from "./components/TheLayout.vue";
</script>

<style scoped>
.header {
  height: 80px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}
.footer {
  text-align: center;
  padding: 38px 0;
  color: #828282;
}
.footer.inside {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
