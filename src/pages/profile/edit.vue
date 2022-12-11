<template>
    <layout :title="'Editar Perfil'">
        <form-container name="edit-profile">
            <van-form @submit.prevent="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="form.name" type="text" name="name" label="Nombre" placeholder="Nombre" />
                    <van-field v-model="form.email" type="email" name="email" label="Email" placeholder="Email" />
                </van-cell-group>
                <action-buttons>
                    <template #btn-submit>
                        <button-submit @on-submit="onSubmit">
                            Editar perfil
                        </button-submit>
                    </template>
                </action-buttons>
            </van-form>

            <van-divider>Cambiar imágen de perfil</van-divider>
            <div class="change-image-profile">
                <div>
                    <van-image round width="5rem" height="5rem"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                </div>
                <div>
                    <van-uploader round v-model="fileList" :max-count="1" :after-read="afterRead" />
                </div>
            </div>
        </form-container>
    </layout>
</template>
<script setup>
import layout from './layout.vue';
import Form from '../../classes/Form';
import { reactive, ref } from 'vue';
// componentes
import actionButtons from '../../container/actionButtons.vue';
import buttonSubmit from '../../components/buttonSubmit.vue';
import formContainer from '../../container/formContainer.vue';

//data
const form = reactive(new Form({
    name: "",
    email: "",
}));

const fileList = ref([]);


// methodos
const onSubmit = () => {

}
const afterRead = (file) => {
    console.log(file);
};

</script>
<style lang='scss' scoped>
.change-image-profile {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem 1rem 0rem 1rem;
}
</style>