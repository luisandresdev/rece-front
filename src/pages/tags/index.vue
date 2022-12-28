<template>
    <layout title="Administrar etiquetas">
        <van-swipe-cell v-for="tag in tags" :key="tag">
            <van-cell :border="true" :title="tag.name" />
            <template #right>
                <van-button square type="danger" text="Borrar" @click="deleteTag(tag)" />
                <van-button square type="primary" text="Editar" @click="editTag(tag)" />
            </template>
        </van-swipe-cell>

        <div class="btn-floating">
            <van-button round icon="plus" type="success" @click="openShowModalAddTag"/>
        </div>

        <!-- Dialog -->
        <van-dialog v-model:show="showModalAddTag" title="Nueva etiqueta" :showConfirmButton="false" :close-on-click-overlay="true">
            <van-form @submit.prevent="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="form.name" name="nombre" label="Nombre" placeholder="Nombre" />
                </van-cell-group>
                <action-buttons>
                    <template #btn-submit>
                        <button-submit @on-submit="onSubmit">
                            crear
                        </button-submit>
                    </template>
                </action-buttons>
            </van-form>
        </van-dialog>

        <!-- Toast -->
        <van-toast v-model:show="successToast" style="padding: 0"></van-toast>
    </layout>
</template>
<script setup>
import { reactive, ref } from 'vue';
import layout from '../../layout/layout.vue';
import { showDialog, showSuccessToast } from 'vant';
import Form from '../../classes/Form';
import actionButtons from '../../container/actionButtons.vue';
import buttonSubmit from '../../components/buttonSubmit.vue';

// data
const form = reactive(new Form({
    name: '',
}))
const tags = reactive([
    {
        id: 1,
        name: 'Rápido',
    },
]);

const showModalAddTag = ref(false);
const successToast = ref(false);

// metodos
const onSubmit = () => {
    console.log(form.data());
    showModalAddTag.value = false;
}
const openShowModalAddTag = () => {
    showModalAddTag.value = true;
}
const deleteTag = (tag) => {
    showDialog({
        title: '¿Está seguro?',
        message: 'Esta acción no podrá deshacerse',
        showCancelButton: true,
    }).then(() => {
        // on close
        console.log('delete', tag)
        showSuccessToast('Eliminado');
    });
}

const editTag = (tag) => {
    openShowModalAddTag();
    console.log('edit', tag);
}
</script>
<style lang='scss' scoped>
.btn-floating {
    position: fixed;
    right: 23px;
    bottom: 23px;
   
}
</style>