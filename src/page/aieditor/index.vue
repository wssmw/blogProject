<template>
    <div class="aieditor">
        <Header @releaseHandle="releaseHandle"></Header>
        <div ref="aiEditorRef" class="aiEditorRef"></div>
        <el-dialog title="文章发布" v-model="showDialog">
            <Release :data="data"></Release>
        </el-dialog>
    </div>
</template>

<script setup>
import Header from './components/header.vue'
import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import Release from './components/release.vue'
import { ElMessage } from 'element-plus'

const aiEditorRef = ref()
let aiEditor
onMounted(() => {
    aiEditor = new AiEditor({
        element: aiEditorRef.value,
        placeholder: '点击输入内容...',
    })
})

const data = reactive({
    title: '',
    html: '',
})
const showDialog = ref(false)
// 发布
const releaseHandle = title => {
    data.html = aiEditor.getHtml()
    data.title = title
    if (data.html === '<p></p>') {
        ElMessage('请输入内容')
        return
    }
    showDialog.value = true
}

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
