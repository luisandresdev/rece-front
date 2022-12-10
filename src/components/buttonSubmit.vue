<template>
    <van-button round block :color="color" :size="size" :native-type="type" @click="onSubmit">
        <slot></slot>
    </van-button>
</template>
<script setup>
const emit = defineEmits(['onSubmit',]);

defineProps({
    color: {
        type: String,
        required: false,
        default: "#6b21a8",
    },
    size: {
        type: String,
        required: false,
        default: "small",
    },
    type: {
        type: String,
        required: false,
        default: "submit",
    },
});

const onSubmit = () => {
    emit('onSubmit');
}
</script>
<style lang="">
    
</style>