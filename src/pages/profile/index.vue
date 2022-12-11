<template lang="">
    <layout :title="'Perfil'">
        <van-card
    :title="'Luis Andrés Bolaños Yapo'"
    :desc="'luisandres33bolanos@gmail.com'"
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
        <van-cell title="Categorías" is-link to="index" icon="orders-o" />
        <van-cell title="Etiquetas" is-link to="index" icon="calendar-o" />
      </van-cell-group>
    </layout>
  </template>
<script setup>
//imports
import layout from "./layout.vue";

// Métodos
const logout = () => {

}

</script>
<style lang=""></style>
  