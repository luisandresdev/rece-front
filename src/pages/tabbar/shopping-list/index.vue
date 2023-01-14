<template>
    <van-cell-group v-for="item in shoppingList" :key="item.id">
        <van-cell is-link :title="item.name" @click="showActionSheetShoppingList(item)"
            :value="item.products.length + '/' + item.products_count" />
        <van-action-sheet v-model:show="show" :actions="actions" @select="onSelectActions" cancel-text="Cancelar" />
    </van-cell-group>

    <!-- button floating -->
    <button-floating :bottom="'4rem'" @open="openShowModalAddShoppingList" />

    <!-- Dialog -->
    <van-dialog v-model:show="showModalAddShoppingList" :title="title" :showConfirmButton="false"
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
    <van-toast v-model:show="successToast" style="padding: 0" :duration="10"></van-toast>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { showDialog, showSuccessToast } from 'vant';
import buttonFloating from '../../../components/buttonFloating.vue';
import Form from '../../../classes/Form';
import actionButtons from '../../../container/actionButtons.vue';
import { useRouter } from 'vue-router';
import ShoppingListService from "../../../services/ShoppingListService";

// data
const show = ref(false);
const router = useRouter();
const form = reactive(new Form({
    id: 0,
    name: '',
}))
let shoppingList = ref([]);
const showModalAddShoppingList = ref(false);
const successToast = ref(false);
let title = ref("");
let textButton = ref("");

// acciones del van-action-sheet
const actions = [
    { name: 'Productos', path: 'products', },
    { name: 'Editar', path: 'edit' },
    { name: 'Vaciar mi lista de la compra', path: 'empty-shopping-list' },
    { name: 'Borrar', color: '#7f1d1d', path: 'delete' },
];

// ciclo de vida
onMounted(() => {
    getShoppingList();
});

// methods

/**
 * Obtener las listas de la compra.
 */
const getShoppingList = () => {
    ShoppingListService.index()
        .then((response) => {
            shoppingList.value = response.data.data;
        }).catch(error => {
            console.log(error)
        });
};

/**
 * Abrir las acciones según la lista de la compra seleccionada 
 * y añadir el id de está.
 * @param {Object} item 
 */
const showActionSheetShoppingList = (item) => {
    show.value = true;
    actions.forEach(element => {
        element.shoppingListId = item.id;
    });
};

/**
 * Redirigir según la acción.
 * @param {Object} item 
 */
const onSelectActions = (item) => {
    show.value = false;
    switch (item.path) {
        case 'products':
            addingProductsToShoppingList(item);
            break;
        case 'edit':
            editShoppingList(item);
            break;
        case 'empty-shopping-list':
            emptyShoppingList(item);
            break;
        case 'delete':
            deleteShoppingList(item);
            break;

        default:
            break;
    }
};

/**
 * Abrir el modal para crear una nueva lista de la compra.
 */
const openShowModalAddShoppingList = () => {
    resetForm();
    showModalAddShoppingList.value = true;
    title.value = "Nueva lista de la compra";
    textButton.value = "Añadir";
};

/**
 * Para crear o editar una lista de la compra.
 */
const update = () => {
    if (form.id == 0) {
        ShoppingListService.store(form.data())
            .then(() => {
                showModalAddShoppingList.value = false;
                getShoppingList();
                showSuccessToast('Añadido');
            })
            .catch(error => {
                form.setErrors(error.response.data.errors);
            })
    } else {
        ShoppingListService.update(form.data())
            .then(() => {
                showModalAddShoppingList.value = false;
                getShoppingList();
                showSuccessToast('Editado');
            }).catch(error => {
                form.setErrors(error.response.data.errors);
            });
    }
}

/**
 * Redirigir a la ruta para ver los productos de 
 * una lista de la compra.
 * @param {Object} shoppingList 
 */
const addingProductsToShoppingList = (shoppingList) => {
    router.push({ name: 'products', params: { id: shoppingList.shoppingListId } });
}

/**
 * Obtener la lista de la compra para editar.
 * @param {Object} shoppingList 
 */
const editShoppingList = (shoppingList) => {
    resetForm();
    showModalAddShoppingList.value = true;
    title.value = "Editar Categoría";
    textButton.value = "Editar";
    ShoppingListService.show(shoppingList.shoppingListId)
        .then(response => {
            form.set(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/**
 * Borrar una lista de la compra.
 * @param {Object} shoppingList 
 */
const deleteShoppingList = (shoppingList) => {
    showDialog({
        title: '¿Está seguro?',
        message: 'Esta acción no podrá deshacerse',
        showCancelButton: true,
        confirmButtonColor:'#15803d',
    }).then(() => {
        ShoppingListService.delete(shoppingList.shoppingListId)
            .then(() => {
                showSuccessToast('Eliminado');
                getShoppingList();
            })
            .catch(error => {
                console.log(error)
            });
    });
}

/**
 * Vaciar la lista de la compra
 * @param {Object} shoppingList 
 */
const emptyShoppingList = (shoppingList) => {
    showDialog({
        title: '¿Está seguro?',
        message: 'Esta acción no podrá deshacerse',
        showCancelButton: true,
        confirmButtonColor: '#15803d',
    }).then(() => {
        ShoppingListService.empty(shoppingList.shoppingListId)
            .then(() => {
                showSuccessToast('Vaciado');
                getShoppingList();
            })
            .catch(error => {
                console.log(error)
            });
    });
}

/**
 * Resetear el form y eliminar los errores.
 */
const resetForm = () => {
    form.id = 0;
    form.name = '';
    form.clearErrors();
}
</script>
<style lang=''>

</style>