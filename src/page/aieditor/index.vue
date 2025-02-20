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
import { articleUploadRequest } from '../../api/module/articles'

const aiEditorRef = ref()
let aiEditor
onMounted(() => {
    aiEditor = new AiEditor({
        element: aiEditorRef.value,
        placeholder: '点击输入内容...',
        image: {
            uploader: (file, uploadUrl, headers, formName) => {
                console.log(file, uploadUrl, headers, formName)
                const formData = new FormData()
                formData.append('file', file)
                console.log(formData, 'formData')
                return new Promise((resolve, reject) => {
                    articleUploadRequest(formData)
                        .then(res => {
                            console.log(res)
                            let resp = {
                                errorCode: 0,
                                data: {
                                    src: res.data.url,
                                },
                            }
                            console.log(resp, 'resp')
                            return resp
                        })
                        .then(json => {
                            resolve(json)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
            },
        },
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
