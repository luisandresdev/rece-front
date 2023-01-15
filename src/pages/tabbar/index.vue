<template>
    <div style="margin-top:2.8rem">
        <router-view></router-view>
    </div>
    <van-tabbar v-model="active" active-color="#4c1d95" inactiveColor="#A1A1AA">
        <van-tabbar-item icon="calendar-o" :to="{ name: 'recipes' }">Recetas</van-tabbar-item>
        <van-tabbar-item icon="wap-home-o" :to="{ name: 'shopping-list' }">Lista de la compra</van-tabbar-item>
        <van-tabbar-item icon="calendar-o" :to="{ name: 'calendar' }">Calendario</van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref } from 'vue';
// data
const active = ref(false);

</script>
<style lang=''>

</style>