<template>
    <layout title="Administrar etiquetas">
        <div style="margin-top: 2.8rem;">
            <list-swipe-data :data="tags" @deleteItem="deleteTag" @editItem="editTag" />        
        </div>

        <!-- button floating -->
        <button-floating @open="openShowModalAddTag" />

        <!-- Dialog -->
        <van-dialog v-model:show="showModalAddTag" :title="title" :showConfirmButton="false"
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
import TagsService from '../../services/TagsService';

// data
const form = reactive(new Form({
    id: 0,
    name: '',
}))
let tags = ref([]);

const showModalAddTag = ref(false);
const successToast = ref(false);
let title = ref("");
let textButton = ref("");

onMounted(() => {
    getTags();
});

// metodos
const getTags = () => {
    TagsService.index()
        .then((response) => {
            tags.value = response.data.data;
        }).catch(error => {
            console.log(error)
        });
}
const update = () => {
    if (form.id == 0) {
        TagsService.store(form.data())
            .then(() => {
                showModalAddTag.value = false;
                getTags();
            })
            .catch(error => {
                form.setErrors(error.response.data.errors);
            })
    } else {
        TagsService.update(form.data())
            .then(() => {
                showModalAddTag.value = false;
                getTags();
            })
            .catch(error => {
                form.setErrors(error.response.data.errors);
            })
    }
}
const openShowModalAddTag = () => {
    showModalAddTag.value = true;
    resetForm();
    title.value = "Nueva Etiqueta";
    textButton.value = "Crear";
}
const deleteTag = (tag) => {
    showDialog({
        title: '¿Está seguro?',
        message: 'Esta acción no podrá deshacerse',
        showCancelButton: true,
    }).then(() => {
        TagsService.delete(tag.id)
            .then(() => {
                showSuccessToast('Eliminado');
                getTags();
            })
            .catch(error => {
                console.log(error)
            });
    });
}

const editTag = (tag) => {
    showModalAddTag.value = true;
    resetForm();
    title.value = "Editar etiqueta";
    textButton.value = "Editar";
    TagsService.show(tag.id)
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