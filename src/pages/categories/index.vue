<template>
    <layout title="Administrar categorías">
        <div style="margin-top: 2.8rem;">
            <list-swipe-data :data="categories" @deleteItem="deleteCategory" @editItem="editCategory" />
        </div>

        <!-- button floating -->
        <button-floating @open="openShowModalAddCategorie" />

        <!-- Dialog -->
        <van-dialog v-model:show="showModalAddCategorie" :title="title" :showConfirmButton="false"
            :close-on-click-overlay="true">
            <van-form @submit.prevent="update" @keyup="form.clearErrors()">
                <van-cell-group inset>
                    <van-field v-model="form.name" name="nombre" label="Nombre" placeholder="Nombre"
                        :error-message="form.errorMessage('name')" />
                </van-cell-group>
                <action-buttons>
                    <template #btn-submit>
                        <button-submit @on-submit="update">
                            {{ textButton }}
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
import { reactive, ref, onMounted } from 'vue';
import layout from '../../layout/layout.vue';
import { showDialog, showSuccessToast } from 'vant';
import Form from '../../classes/Form';
import actionButtons from '../../container/actionButtons.vue';
import buttonFloating from '../../components/buttonFloating.vue';
import listSwipeData from '../../components/listSwipeData.vue';
import CategoriesService from '../../services/CategoriesService';

// data
const form = reactive(new Form({
    id: 0,
    name: '',
}))
let categories = ref([]);
const showModalAddCategorie = ref(false);
const successToast = ref(false);
let title = ref("");
let textButton = ref("");


onMounted(() => {
    getCategories();
});
// metodos
const getCategories = () => {
    CategoriesService.index()
        .then((response) => {
            categories.value = response.data.data;
        }).catch(error => {
            console.log(error)
        });
}

// crear o editar una categoría
const update = () => {
    if (form.id == 0) {
        CategoriesService.store(form.data())
            .then(() => {
                showModalAddCategorie.value = false;
                getCategories();
            }).catch(error => {
                form.setErrors(error.response.data.errors);
            });
    } else {
        CategoriesService.update(form.data())
            .then(() => {
                showModalAddCategorie.value = false;
                getCategories();
            }).catch(error => {
                form.setErrors(error.response.data.errors);
            });
    }
}

// abrir el modal
const openShowModalAddCategorie = () => {
    resetForm();
    showModalAddCategorie.value = true;
    title.value = "Nueva Categoría";
    textButton.value = "Crear";
}
// eliminar
const deleteCategory = (categorie) => {
    showDialog({
        title: '¿Está seguro?',
        message: 'Esta acción no podrá deshacerse',
        showCancelButton: true,
    }).then(() => {
        CategoriesService.delete(categorie.id)
            .then(() => {
                showSuccessToast('Eliminado');
                getCategories();
            })
            .catch(error => {
                console.log(error)
            });
    });
}

// editar
const editCategory = (categorie) => {
    showModalAddCategorie.value = true;
    resetForm();
    title.value = "Editar Categoría";
    textButton.value = "Editar";
    CategoriesService.show(categorie.id)
        .then(response => {
            form.set(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

// resetear el form y eliminar los errores
const resetForm = () => {
    form.id = 0;
    form.name = '';
    form.clearErrors();
}

</script>
<style lang=''>

</style>