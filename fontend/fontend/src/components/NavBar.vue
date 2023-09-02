<template>
  <nav class="navbar">
    <router-link to="/"><img src="../assets/logo.svg" /></router-link>
    <!-- 搜索输入框 -->
    <div class="searchInput">
      <input type="text" @change="searchPosts" />
      <TheIcon icon="search" />
    </div>
    <div class="navItems">
      <router-link to="/"><TheIcon icon="home" /></router-link>
      <button @click="publishPost()">
        <TheIcon icon="publish" />
      </button>
      <!-- 下拉菜单栏 -->
      <div class="profileDropDown">
        <TheAvatar
          :width="42"
          :height="42"
          style="cursor: pointer"
          @click="showDropdown = !showDropdown"
          :src="user.avatar"
        />
        <!-- <img src="../assets/avatarDefault.png" width="42" height="42" /> -->
        <div
          class="dropdownMenu"
          v-show="showDropdown"
          @click="showDropdown = false"
        >
          <ul class="profileMenu">
            <li><router-link to="/profile">个人主页</router-link></li>
            <li @click="logout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import TheIcon from "../components/TheIcon.vue";
import TheAvatar from "../components/TheAvatar.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

// 控制下拉菜单
const showDropdown = ref(false);
const store = useStore();
const router = useRouter();

const user = store.getters.getUserInformation;

function publishPost() {
  store.commit("changeShowPostUpload", true);
}

async function searchPosts(e) {
  let searchInput = e.target.value;
   if(searchInput.length<1){
      router.push('/home')
      return;
   }
    await store.dispatch("searchPosts", searchInput).then(() => {
      router.push({
        name: "search_result",
      params: {
        term: searchInput,
      },
    });
  });
  
}

async function logout() {
  await store.dispatch("logoutUser");
  router.replace("/login");
}
</script>

<style lang="less" scoped>
.navbar {
  width: 80vw;
  height: 80px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; //note
  align-items: center;
  svg {
    width: 38px;
    height: 38px;
  }
}
.searchInput {
  position: relative;
  input {
    width: 100%;
    padding: 12px;
    padding-left: 36px;
    background: #f1f1f1;
    border-radius: 14px;
    border: none;
  }
  & > svg {
    position: absolute;
    left: 0;
    top: 11px;
    left: 12px;
  }
}
.navItems {
  justify-self: end;
  display: flex;
  gap: 24px; //note
  align-items: center;
  & > button {
    border: none;
    background: none;
  }
}
.profileDropDown {
  position: relative;
}
.profileMenu {
  //这段都note
  position: absolute;
  width: max-content; //note
  padding: 24px 26px;
  list-style: none;
  background: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  right: 0;
  display: grid;
  row-gap: 18px; //note 在网格布局中，通过使用  grid-template-rows  或  grid-auto-rows  属性来定义行的大小，然后使用  row-gap  属性来设置行之间的间距。
  //需要注意的是， row-gap  属性只对网格布局中的行间距起作用，不会影响
  transform: translateY(18px);
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    top: -12px;
    right: 10px;
    border-bottom: 12px solid white;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
  }
  a {
    &:visited {
      color: initial;
    }
  }
}
.profileMenu a,
.profileMenu li {
  text-decoration: none;
  cursor: pointer;
}
</style>
