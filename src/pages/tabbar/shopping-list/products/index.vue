<template>
    <!-- TODO: no funcion vuelement login -->
    <layout :title="title + ' / Productos'">

        <van-form @submit.prevent="update" @keyup="form.clearErrors()">
            <van-cell-group>
                <van-field v-model="form.name" placeholder="Añadir producto" :error-message="form.errorMessage('name')">
                    <template #button>
                        <van-button size="small" :icon="actionIcon.icon" :color="actionIcon.color"
                            @click="update"></van-button>
                    </template>
                </van-field>
            </van-cell-group>
        </van-form>
        <van-tabs v-model:active="activeName" :color="'#4c1d95'" :sticky="true">
            <van-tab :title="'Sin completar'" name="not completed">
                <van-cell-group v-for="product in products" :key="product.id">
                    <div class="custom-cell-group">
                        <div style="margin-left:5px;margin-top:-1px ;">
                            <van-checkbox v-model="product.completed" checked-color="#4c1d95" icon-size="15px"
                                @click="completedProduct(product)"></van-checkbox>
                        </div>
                        <div style="width:100%">
                            <van-cell :title="product.name" :is-link="product.completed ? false : true"
                                :title-style="product.completed ? 'text-decoration: line-through !important' : ''"
                                @click="showActionSheetProduct(product)">
                            </van-cell>
                            <van-action-sheet v-model:show="show" :actions="actions" @select="onSelectActions"
                                cancel-text="Cancelar" />
                        </div>
                    </div>
                </van-cell-group>
            </van-tab>
            <van-tab :title="'Completados'" name="completed">
                <van-cell-group v-for="product in products_completed" :key="product.id">
                    <div class="custom-cell-group">
                        <div style="margin-left:5px;margin-top:-1px ;">
                            <van-checkbox v-model="product.completed" checked-color="#4c1d95" icon-size="15px"
                                @click="completedProduct(product)"></van-checkbox>
                        </div>
                        <div style="width:100%">
                            <van-cell :title="product.name" is-link
                                :title-style="product.completed ? 'text-decoration: line-through !important' : ''"
                                @click="showActionSheetProduct(product)">
                            </van-cell>
                            <van-action-sheet v-model:show="show" :actions="actions_completed" @select="onSelectActions"
                                cancel-text="Cancelar" />
                        </div>
                    </div>
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </layout>


    <van-toast v-model:show="successToast" style="padding: 0" :duration="10"></van-toast>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import Form from '../../../../classes/Form';
import ProductService from '../../../../services/ProductService';
import { useRoute } from 'vue-router';
import { showDialog, showSuccessToast } from 'vant';
import layout from '../../../../layout/layout.vue';
import ShoppingListService from '../../../../services/ShoppingListService';



//data
const route = useRoute();
const form = reactive(new Form({
    id: 0,
    name: '',
    shopping_list_id: route.params.id,
}));
let products = ref([]);
let products_completed = ref([]);
const show = ref(false);
const successToast = ref(false);
const actionIcon = reactive({
    icon: "plus",
    color: "#14532d"
});
let title = ref("");



// acciones del van-action-sheet
const actions = [
    { name: 'Editar', path: 'edit' },
    { name: 'Completar', path: 'completed' },
    { name: 'Borrar', color: '#7f1d1d', path: 'delete' },
];

const actions_completed = [
    { name: 'Borrar', color: '#7f1d1d', path: 'delete' },
];

const activeName = ref('not completed');

// ciclo de vida
onMounted(() => {
    getShoppingList();
});

// methods


const getShoppingList = () => {
    ShoppingListService.show(route.params.id)
        .then(response => {
            let data = response.data.data;
            title.value = data.name;
            getProducts();
        })
        .catch(error => {
            console.log(error)
        })
}
/**
 * Obtener las listas de la compra.
 */
const getProducts = () => {
    let context = {
        'shopping_list_id': route.params.id,
    }
    ProductService.index(context)
        .then((response) => {
            let data = response.data.data;
            products.value = data.filter(product => {
                return product.completed == false;
            });
            products_completed.value = data.filter(product => {
                return product.completed == true;
            })
        }).catch(error => {
            console.log(error)
        });
};

const update = () => {
    if (form.id == 0) {
        ProductService.store(form.data())
            .then(() => {
                getProducts();
                resetForm();
                showSuccessToast('Añadido');
            }).catch(error => {
                form.setErrors(error.response.data.errors);
            })
    } else {
        ProductService.update(form.data())
            .then(() => {
                getProducts();
                resetForm();
                showSuccessToast('Editado');
            }).catch(error => {
                form.setErrors(error.response.data.errors);
            })
    }

}



/**
 * Abrir las acciones según el producto seleccionado
 * y añadir el id.
 * @param {Object} item 
 */
const showActionSheetProduct = (item) => {
    show.value = true;
    actions.forEach(element => {
        element.product = item;
    });
    actions_completed.forEach(element => {
        element.product = item;
    });
};

const onSelectActions = (item) => {
    show.value = false;
    switch (item.path) {
        case 'edit':
            editProduct(item.product)
            break;
        case 'completed':
            completedProduct(item.product);
            break;
        case 'delete':
            deleteProduct(item.product);
            break;

        default:
            break;
    }
}

const completedProduct = (product) => {
    ProductService.completed(product.id)
        .then(() => {
            getProducts();
        })
        .catch(error => {
            console.log(error)
        })
}

const deleteProduct = (product) => {
    showDialog({
        title: '¿Está seguro?',
        message: 'Esta acción no podrá deshacerse',
        showCancelButton: true,
        confirmButtonColor: '#15803d',
    }).then(() => {
        ProductService.delete(product.id)
            .then(() => {
                showSuccessToast('Eliminado');
                getProducts();
            })
            .catch(error => {
                console.log(error)
            });
    });
}


/**
 * Obtener la lista de la compra para editar.
 * @param {Object} shoppingList 
 */
const editProduct = (product) => {
    resetForm();
    actionIcon.icon = 'edit';
    actionIcon.color = '#2563eb';
    ProductService.show(product.id)
        .then(response => {
            form.set(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
}
/**
 * Resetear el form y eliminar los errores.
 */
const resetForm = () => {
    form.id = 0;
    form.name = '';
    form.clearErrors();
    actionIcon.icon = "plus";
    actionIcon.color = "#14532d";
}
</script>
<style lang='scss' scoped>
.custom-cell-group {
    display: flex;
    align-items: center;
}

.icons-action {
    font-size: 1.2rem;
    cursor: pointer;
    line-height: inherit;
    background-color: #3d3d3d;
    padding: 1px;
    border-radius: 5px;
}
</style>