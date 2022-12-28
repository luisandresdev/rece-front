<template lang="">
    <van-nav-bar
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <slot></slot>
  </template>
<script setup>
import { useRouter } from 'vue-router';
//props
defineProps({
  title: {
    type: String,
    required: true,
  },
});

//data
const router = useRouter();

// methods
const onClickLeft = () => {
  router.back();
}


</script>
<style lang=""></style>
  