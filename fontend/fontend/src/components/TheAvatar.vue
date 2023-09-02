<template>
        <img :src="src || defaultAvatar"  alt="#" class="avatar"/>
</template>

<script setup>
import defaultAvatar from "../assets/avatarDefault.png"
/**
 * 因为头像在许多页面都要复用，所以采用这种方式自定义组件的参数，值得学习
 */
defineProps({
    src:String,
    width:{
        type:Number,
        default:34,
    },
    height:{
        type:Number,
        default:34
    }
})

</script>
<style scoped>

.avatar {
  width: v-bind(width + "px");
  height: v-bind(height + "px");
  border-radius: 50%;
  background: #eee;
  object-fit: cover;
  object-position: top center;
}
</style>