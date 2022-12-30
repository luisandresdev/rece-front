<template>
    <layout :title="'Cambiar contraseña'">
        <form-container name="change-password">
            <van-form @submit.prevent="onSubmit" @keyup="form.clearErrors()">
                <van-cell-group inset>
                    <van-field v-model="form.password" type="password" name="password"
                        :error-message="form.errorMessage('password')" label="Contraseña" placeholder="Contraseña" />
                    <van-field v-model="form.password_confirmation" type="password"
                        :error-message="form.errorMessage('password_confirmation')" name="password_confirmation"
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
        <van-toast v-model:show="show" style="padding: 0"></van-toast>
    </layout>
</template>
<script setup>
import layout from './layout.vue';
import { reactive, ref } from 'vue';
import ProfileService from '../../services/ProfileService';
import { showToast } from 'vant';
import Form from '../../classes/Form';
// Composables
import { usePush } from '../../composables/push.js';

// components
import actionButtons from '../../container/actionButtons.vue';
import buttonSubmit from '../../components/buttonSubmit.vue';
import formContainer from '../../container/formContainer.vue';

// data
const form = reactive(new Form({
    password: '',
    password_confirmation: '',

}));
const show = ref(false);
const { redirectPush } = usePush();

// methods
const onSubmit = () => {
    ProfileService.changePassword(form.data())
        .then(() => {
            showToast({
                message: 'Contraseña editada',
                wordBreak: 'break-word',
                icon: "passed"
            });
            redirectPush('profile');
        }).catch(error => {
            form.setErrors(error.response.data.errors)
        })
}
</script>
<style lang=''>

</style>