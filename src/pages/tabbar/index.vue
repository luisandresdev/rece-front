<template>
    <van-nav-bar title="Recetas" @click-right="onClickRight">
        <template #right>
            <van-image round width="2.3rem" height="2.3rem"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </template>
    </van-nav-bar>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#4c1d95" inactiveColor="#A1A1AA">
        <van-tabbar-item icon="calendar-o" :to="{ name: 'recipes' }">Recetas</van-tabbar-item>
        <van-tabbar-item icon="wap-home-o" :to="{ name: 'shopping-list' }">Lista de la compra</van-tabbar-item>
        <van-tabbar-item icon="calendar-o" :to="{ name: 'calendar' }">Calendario</van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref } from 'vue';
import { usePush } from '../../composables/push';
// data
const active = ref(false);

const { redirectPush } = usePush();

//methods
const onClickRight = () => {
    redirectPush('profile')
}
</script>
<style lang=''>

</style>