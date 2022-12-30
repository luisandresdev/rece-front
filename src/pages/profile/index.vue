<template lang="">
    <layout :title="'Perfil'">
        <van-card
          :title="name"
          :desc="email"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        >     
    <template #footer>
      <van-button icon="close" round size="mini" type="danger" @click="logout">Cerrar sesión</van-button>
    </template>
  </van-card>
      <van-cell-group title="Editar" inset>
        <van-cell
          title="Perfil"
          is-link
          to="/profile/edit"
          icon="user-o"
        />
        <van-cell
          title="Contraseña"
          is-link
          to="/profile/change-password"
          icon="eye-o"
        />
      </van-cell-group>
      <van-cell-group title="Administrar" inset>
        <van-cell title="Categorías" is-link to="/categories" icon="orders-o" />
        <van-cell title="Etiquetas" is-link to="/tags" icon="calendar-o" />
      </van-cell-group>
    </layout>
  </template>
<script setup>
//imports
import layout from "./layout.vue";
import { onMounted, ref } from "vue";
import ProfileService from "../../services/ProfileService";
import AuthService from "../../services/AuthService";

// data
const name = ref('');
const email = ref('');

onMounted(() => {
  profile();
})


// Métodos
const profile = () => {
  ProfileService.profile().then(response => {
    name.value = response.data.data.name;
    email.value = response.data.data.email;
  }).catch(error => {
    console.log(error);
  })
}
const logout = () => {
  AuthService.logout();
}

</script>
<style lang=""></style>
  