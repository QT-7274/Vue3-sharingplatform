<template>
  <div>
    <div v-if="!isUserLoggedIn" style="text-align:center;font-size: 24px;font-weight: bold">
      <span> 请登录后查看所有帖子 </span>
    </div>
    <PostList>
      <PostItem v-for="post in posts" :post="post" :key="post.id" />
    </PostList>
    <PostDetails v-if="showPostDetails" />
    <PostUpload v-if="showPostUpload" />
  </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostDetails from "../components/PostDetails.vue";
import PostUpload from "../components/PostUpload.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();
const isUserLoggedIn = computed(() => store.getters.getUserConfirmed);
const showPostUpload = computed(() => store.state.showPostUpload);
const showPostDetails = computed(() => store.state.showPostDetails);

const posts = computed(() => store.state.post.list);

onMounted(() => {
  store.dispatch("clearSearchResult")
  store.dispatch("loadAllPosts");
});
</script>

<style></style>
