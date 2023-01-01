<template>
    <van-swipe-cell v-for="item in data" :key="item.id">
        <van-cell :border="true" :title="item.name" />
        <template #right>
            <van-button square type="danger" text="Borrar" @click="deleteItem(item)" />
            <van-button square type="primary" text="Editar" @click="editItem(item)" />
        </template>
    </van-swipe-cell>
</template>
<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['deleteItem', 'editItem']);



// métodos
const deleteItem = (item) => {
    emit('deleteItem', item)
}
const editItem = (item) => {
    emit('editItem', item)
}

</script>
<style lang=''>

</style>