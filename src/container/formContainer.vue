<template>
    <div class="form-container" :id="`form-${name}`">
        <slot></slot>
    </div>
</template>
<script setup>
defineProps({
    name: {
        type: String,
        required: false,
        default: 'form',
    }
})
</script>
<style lang='scss'>
.form-container {
    margin-top: 1.5rem;
}
</style>