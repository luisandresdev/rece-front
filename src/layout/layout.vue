<template lang="">
  <van-nav-bar
    :title="title"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight" 
    :fixed="true"
  >
  <template #right>
          <van-image round width="2.3rem" height="2.3rem"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      </template>
  </van-nav-bar>
 
  <slot></slot>
</template>
<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import { usePush } from '../composables/push';
//props
defineProps({
  title: {
    type: String,
    required: true,
  },
});

//data
const router = useRouter();
const { redirectPush } = usePush();

// methods
const onClickLeft = () => {
  router.back();
}
const onClickRight = () => {
    redirectPush('profile')
}

</script>
<style lang=""></style>
