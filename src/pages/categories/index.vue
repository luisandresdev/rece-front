<template>
    <layout title="Administrar categorías">
        <van-swipe-cell v-for="categorie in categories" :key="categorie">
            <van-cell :border="true" :title="categorie.name" />
            <template #right>
                <van-button square type="danger" text="Borrar" @click="deleteCategorie(categorie)" />
                <van-button square type="primary" text="Editar" @click="editCategorie(categorie)" />
            </template>
        </van-swipe-cell>

        <div class="btn-floating">
            <van-button round icon="plus" type="success" @click="openShowModalAddCategorie"/>
        </div>

        <!-- Dialog -->
        <van-dialog v-model:show="showModalAddCategorie" title="Nueva categoria" :showConfirmButton="false" :close-on-click-overlay="true">
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
const categories = reactive([
    {
        id: 1,
        name: 'Entrada',
    },
    {
        id: 2,
        name: 'Plato Principal',
    },
    {
        id: 3,
        name: 'Postre',
    }
]);

const showModalAddCategorie = ref(false);
const successToast = ref(false);

// metodos
const onSubmit = () => {
    console.log(form.data());
    showModalAddCategorie.value = false;
}
const openShowModalAddCategorie = () => {
    showModalAddCategorie.value = true;
}
const deleteCategorie = (categorie) => {
    showDialog({
        title: '¿Está seguro?',
        message: 'Esta acción no podrá deshacerse',
        showCancelButton: true,
    }).then(() => {
        // on close
        console.log('delete', categorie)
        showSuccessToast('Eliminado');
    });
}

const editCategorie = (categorie) => {
    console.log('edit', categorie);
    openShowModalAddCategorie();
}
</script>
<style lang='scss' scoped>
.btn-floating {
    position: fixed;
    right: 23px;
    bottom: 23px;
   
}
</style>