<template>
    <div class="btn-floating">
        <van-button round icon="plus" type="success" @click="open" />
    </div>
</template>
<script setup>
const emit = defineEmits(['open',]);
const open = () => {
    emit('open');
}
</script>
<style lang='scss' scoped>
.btn-floating {
    position: fixed;
    right: 23px;
    bottom: 23px;

}
</style>