<template>
    <div>
        <div v-html="prop.html" class="aie-content"></div>
    </div>
</template>
<script setup>
import 'aieditor/dist/style.css'
const prop = defineProps({
    html: {
        type: String,
    },
})
</script>
<style scoped lang="less"></style>
