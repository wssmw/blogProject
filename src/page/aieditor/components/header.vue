<template>
    <div class="header">
        <el-input
            v-model="articleTitle"
            @input="titleChangeHandle"
            show-word-limit
            placeholder="请输入文章标题"
            maxlength="120"
            size="large"
        >
        </el-input>
        <el-dropdown trigger="click">
            <el-button class="drafts"> 草稿箱 </el-button>
            <template #dropdown>
                <el-dropdown-menu v-if="draftList.length">
                    <el-dropdown-item v-for="item in draftList" :key="item.key" @click="draftClickHandle(item)">
                        <div class="w-48 h-14 flex flex-col justify-around">
                            <div class="text-ellipsis overflow-hidden whitespace-nowrap font-bold">
                                {{ item.title }}
                            </div>
                            <div class="flex align-center">
                                <div class="mr-4">{{ transDate(item.updated_at) }}</div>
                                <el-dropdown>
                                    <el-icon class="mt-1"><More /></el-icon>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="draftClickHandle(item)"> 编辑 </el-dropdown-item>
                                            <el-dropdown-item @click="draftDeleteHandle(item)"> 删除 </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
                <el-empty style="width: 300px" v-else description="当前没有草稿"> </el-empty>
            </template>
        </el-dropdown>
        <el-button class="release" @click="releaseHandle"> 发布 </el-button>
        <div class="w-[50px]">
            <img class="w-10 h-10 rounded-full" :src="store.userInfo.avatar_url" alt="" />
        </div>
        <el-dialog v-model="showDialog" title="操作提示" width="400">
            <div class="flex items-center">
                <el-icon size="25" color="#e6a23c"><InfoFilled /></el-icon>
                <span class="ml-3"> 确认删除? </span>
            </div>
            <div class="w-full text-right">
                <el-button @click="confirmHandle">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { transDate } from '@/utils'
import { appStore } from '../../../store/module/app'
import { draftListRequest, draftDeleteRequest } from '@/api/module/articles.js'

const props = defineProps(['content'])
const emit = defineEmits(['titleChangeHandle', 'releaseHandle', 'recurrentDraft'])
const store = appStore()
const articleTitle = ref()

const titleChangeHandle = () => {
    emit('titleChangeHandle', articleTitle.value)
}

const releaseHandle = () => {
    console.log(props.content)
    if (!articleTitle.value) {
        ElMessage('请输入标题')
    } else {
        emit('releaseHandle', articleTitle.value)
    }
}

const draftList = ref([])

onMounted(async () => {
    const { data } = await draftListRequest()
    console.log(data, 'results')
    draftList.value = data.drafts
})

const draftClickHandle = e => {
    console.log(e)
    articleTitle.value = e.title
    emit('recurrentDraft', e)
}

const showDialog = ref(false)
const currentDraft = ref({})
const draftDeleteHandle = e => {
    console.log(e)
    currentDraft.value = e
    showDialog.value = true
}
const confirmHandle = async () => {
    console.log(currentDraft)
    const results = draftDeleteRequest({ id: currentDraft.value.id })
    if (results.success) {
        showDialog.value = false
        ElMessage.success('删除成功')
    }
}
</script>
<style scoped lang="less">
.header {
    padding: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: var(--theme-sec-background);
    border-radius: 4px;
    .drafts {
        margin: 0 10px;
    }
    .release {
        margin-right: 20px;
    }
}
</style>
