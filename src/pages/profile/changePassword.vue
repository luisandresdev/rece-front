<template>
    <layout :title="'Cambiar contraseña'">
        <form-container name="change-password">
            <van-form @submit.prevent="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="form.password" type="password" name="password" label="Contraseña"
                        placeholder="Contraseña" />
                    <van-field v-model="form.password_confirmation" type="password" name="password_confirmation"
                        label="Confirmar contraseña" placeholder="Confirmar contraseña" />
                </van-cell-group>
                <actionButtons>
                    <template #btn-submit>
                        <button-submit @on-submit="onSubmit">
                            cambiar contraseña
                        </button-submit>
                    </template>
                </actionButtons>
            </van-form>
        </form-container>
    </layout>
</template>
<script setup>
import layout from './layout.vue';
import { reactive } from 'vue';
import Form from '../../classes/Form';

// components
import actionButtons from '../../container/actionButtons.vue';
import buttonSubmit from '../../components/buttonSubmit.vue';
import formContainer from '../../container/formContainer.vue';

// data
const form = reactive(new Form({
    password: '',
    password_confirmation: '',

}));

// methods
const onSubmit = () => {

}
</script>
<style lang=''>

</style>