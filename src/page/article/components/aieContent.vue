<template>
    <MdPreview :theme="theme" :modelValue="html" :id="editorId" :mdHeadingId="mdHeadingId" />
</template>
<script setup>
import { onMounted, computed } from 'vue'
import { MdPreview } from 'md-editor-v3'
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css'
import { appStore } from '../../../store/module/app'
const prop = defineProps({
    html: {
        type: String,
        default: '',
    },
})
const store = appStore()

const theme = computed(() => store.theme)

const mdHeadingId = (_text, _level, index) => `md-editor-v3_h${_level}_${index}`

const editorId = 'demo-preview'
const emit = defineEmits(['renderCompleted'])
onMounted(() => {
    emit('renderCompleted')
})
</script>
<style scoped lang="less"></style>
