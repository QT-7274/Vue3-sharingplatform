<template>
  <div class="postItem">
    <img
      :src="post.image"
      @click="$store.dispatch('showPostDetails', post.id)"
      alt=""
      width="100%"
      height="100%"
      style="background: #eee"
    />
    <div class="postInfo">
      <div class="postMeta">
        <!-- 头像显示 -->
        <TheAvatar :src="post?.user?.avatar" />
        <!-- 发布者名称显示 -->
        <span>{{ post?.user?.name }}</span>
        <!-- 发布时间转换 -->
        <span class="postPubDate">{{ dateToRelative(post.publishedAt) }}</span>
        <!-- 发布底部栏的选项显示 -->
        <PostActions
          :likes="post.liked_bies"
          :comments="post.comments"
          :favors="post.favored_bies"
          :likedByMe="post.likedByMe"
          :favoredByMe="post.favoredByMe"
          @likeClick="$store.dispatch('toggleLike', post.id)"
          @favorClick="$store.dispatch('toggleFavor', post.id)"
          @commentsClick="this.$store.dispatch('showPostDetails', post.id)"
        />
      </div>
      <div class="postDesc">
        <p>
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TheAvatar from "../components/TheAvatar.vue";
import PostActions from "../components/PostActions.vue";
import { dateToRelative } from "../utils/date";

//父组件给子组件传递的post列表参数
defineProps({
  post: {
    type: Object,
    default: {},
  },
});
</script>
<style lang="less" scoped>
.postItem {
  > img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    background: #eee;
    cursor: pointer;
  }
  .postInfo {
    padding: 24px;
    .postMeta {
      display: grid;
      grid-template-areas:
        "avatar name actions"
        "pubDate pubDate actions";
      grid-template-columns: 42px 1fr 3fr;
      row-gap: 6px;
      .avatar {
        grid-area: avatar;
      }
      .postPubDate {
        grid-area: pubDate;
        color: #9f9f9f;
        font-size: 14px;
      }
      span {
      }
      .postPubDate {
      }
    }
    .postDesc {
      margin-top: 28px;
      white-space: pre-line;
      p {
      }
    }
  }
}
.postActions {
  grid-area: actions;
  justify-self: end;
}
</style>
