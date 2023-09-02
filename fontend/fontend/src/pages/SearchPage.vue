<template>
  <div>
    <h2 class="title" v-show="term.length > 1">搜索结果：{{ term }}</h2>
    <PostList>
      <PostItem v-for="(post) in searchResult" :key="post.id" :post="post" />
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
import { computed,onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const searchResult = computed(() => store.state.post.searchResult);
const showPostUpload = computed(() => store.state.showPostUpload);
const showPostDetails = computed(() => store.state.showPostDetails);

const route = useRoute();
const term = computed(() => route.params.term);

onMounted(() => {
  store.dispatch("loadAllPosts");
});
</script>
<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>
