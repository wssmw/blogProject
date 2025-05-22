<template>
    <div class="aieditor">
        <Header @releaseHandle="releaseHandle"></Header>
        <MdEditor
            class="md-editor"
            v-model="data.html"
            :mdHeadingId="mdHeadingId"
            @onUploadImg="onUploadImg"
        ></MdEditor>
        <el-dialog title="文章发布" v-model="showDialog">
            <Release :data="data"></Release>
        </el-dialog>
    </div>
</template>

<script setup>
import Header from './components/header.vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import { reactive, ref } from 'vue'
import Release from './components/release.vue'
import { ElMessage } from 'element-plus'
import { articleUploadRequest } from '../../api/module/articles'

const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
        files.map(file => {
            return new Promise((rev, rej) => {
                const form = new FormData()
                form.append('file', file)
                articleUploadRequest(form)
                    .then(res => rev(res))
                    .catch(error => rej(error))
            })
        }),
    )
    callback(res.map(item => item.data.url))
}

const data = reactive({
    title: '',
    html: '',
})
const showDialog = ref(false)
// 发布
const releaseHandle = title => {
    data.title = title
    if (data.html === '<p></p>') {
        ElMessage('请输入内容')
        return
    }
    showDialog.value = true
}
</script>
<style scoped lang="less">
.aieditor {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding: 20px;
    .md-editor {
        flex: 1;
        border-radius: 4px;
    }
}
</style>
