<template>
    <div class="btn-floating">
        <van-button round icon="plus" :color="color" @click="open" />
    </div>
</template>
<script setup>
const emit = defineEmits(['open',]);
const props = defineProps({
    right: {
        type: String,
        required: false,
        default: "1rem"
    },
    bottom: {
        type: String,
        required: false,
        default: "1rem"
    },
    color: {
        type: String,
        required: false,
        default: "#14532d"
    },
})
const open = () => {
    emit('open');
}
</script>
<style lang='scss' scoped>
.btn-floating {
    position: fixed;
    right: v-bind(right);
    bottom: v-bind(bottom);
}
</style>