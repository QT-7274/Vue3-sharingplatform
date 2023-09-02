<template>
    <svg>
        <use :href="`${sprite}#icon-${icon}`"></use>
    </svg>
</template>

<script setup>
import sprite from '../assets/icons/sprite.svg'

//该方法能够接收外部传递的数据，这些数据可以通过组件的属性进行传递。
defineProps({
    icon:String //需要传入一个对象作为参数，对象的属性就是我们要定义的组件属性。
})
</script>
