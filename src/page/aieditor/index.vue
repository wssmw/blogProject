<template>
    <div class="aieditor">
        <Header
            ref="headerRef"
            @titleChangeHandle="titleChangeHandle"
            @releaseHandle="releaseHandle"
            @recurrentDraft="recurrentDraft"
        ></Header>
        <MdEditor
            class="md-editor"
            v-model="data.html"
            :mdHeadingId="mdHeadingId"
            :theme="theme"
            @onUploadImg="onUploadImg"
        ></MdEditor>
        <el-dialog title="文章发布" v-model="showDialog">
            <Release :data="data" :draftInfo="draftInfo" @resetHandle="resetHandle"></Release>
        </el-dialog>
    </div>
</template>

<script setup>
import Header from './components/header.vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import Release from './components/release.vue'
import { ElMessage } from 'element-plus'
import { articleUploadRequest, draftSaveRequest } from '../../api/module/articles'

import { appStore } from '../../store/module/app'

const store = appStore()

const theme = computed(() => store.theme)

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

const titleChangeHandle = e => {
    data.title = e
}

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

const draftInfo = ref({})
const headerRef = ref()
const isNeedSave = ref(true)
// 回显草稿
const recurrentDraft = e => {
    data.html = e.content
    draftInfo.value = e
}
// 在草稿箱内容放到md里面之后再发布,是不需要保存到草稿箱里面的
const resetHandle = () => {
    isNeedSave.value = false
}

onBeforeUnmount(async () => {
    if (isNeedSave.value) {
        if (draftInfo.value.id) {
            let { id } = draftInfo.value
            // 更新数据
            await draftSaveRequest({
                id,
                title: data.title,
                content: data.html,
            })
        } else {
            if (data.html || data.title) {
                await draftSaveRequest({
                    title: data.title,
                    content: data.html,
                })
            }
        }
    }
})
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
