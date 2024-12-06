<template>
    <div class="aieditor">
        <Header></Header>
        <div ref="aiEditorRef" class="aiEditorRef"></div>
    </div>
</template>

<script setup>
import Header from './components/header.vue'
import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'
import { onMounted, onUnmounted, ref } from 'vue'

const aiEditorRef = ref()
let aiEditor
let html = ref()
onMounted(() => {
    aiEditor = new AiEditor({
        element: aiEditorRef.value,
        placeholder: '点击输入内容...',
    })
})
onUnmounted(() => {
    aiEditor && aiEditor.destroy()
})
</script>
<style scoped lang="less">
.aieditor {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding: 20px;
    .aiEditorRef {
        flex: 1;
        border-radius: 4px;
    }
}
</style>
