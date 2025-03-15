<template>
    <div
        class="cursor-pointer flex justify-between items-center w-full h-[100px] border-b border-solid"
        @click="clickHandle(articleItem)"
    >
        <div class="flex flex-1 flex-col justify-between h-[78px] overflow-hidden">
            <div class="text-lg font-medium text-ellipsis overflow-hidden whitespace-nowrap">{{
                articleItem.title
            }}</div>
            <div class="text-ellipsis overflow-hidden whitespace-nowrap">{{ articleItem.summary }}</div>
            <div class="flex justify-between">
                <div class="flex items-center">
                    <div v-if="isUserHomePage" class="max-w-[132px] text-nowrap text-ellipsis overflow-hidden mr-1">{{
                        getTimeAgo(articleItem.updated_at)
                    }}</div>
                    <div
                        v-else
                        class="max-w-[132px] text-nowrap text-ellipsis overflow-hidden mr-1"
                        @click.stop="goToUserHandle(articleItem.user_id)"
                        >{{ articleItem.author_name }}</div
                    >
                    <el-divider direction="vertical"></el-divider>
                    <div class="mx-2 flex items-center">
                        <el-icon size="16" class="mr-1"><View /></el-icon>
                        {{ articleItem.view_count }}
                    </div>
                    <div class="mx-2 flex items-center">
                        <el-icon size="16" class="mr-1"><ChatDotRound /></el-icon>
                        {{ articleItem.comment_count }}
                    </div>
                    <div class="mx-2 flex">
                        <img v-if="articleItem.has_liked" class="img w-[16px]" src="../assets/svg/点赞_1.svg" alt="" />
                        <img v-else class="img w-[16px]" src="../assets/svg/点赞.svg" alt="" />
                        <span class="ml-1">
                            {{ articleItem.like_count }}
                        </span>
                    </div>
                    <el-dropdown class="mx-2" v-if="userInfo.id === articleItem.user_id">
                        <el-icon><MoreFilled /></el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.stop="editHandle(articleItem)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.stop="deleteHandle(articleItem.id)">删除 </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="flex">
                    <template
                        v-for="(secItem, secIndex) in articleItem.tags.length > 3
                            ? articleItem.tags.slice(0, 3)
                            : articleItem.tags"
                        :key="secItem"
                    >
                        <el-tag class="mx-1" :type="TAG_TYPES[secIndex]">{{ secItem.name }}</el-tag>
                    </template>
                </div>
            </div>
        </div>
        <div class="w-[108px] h-[78px] ml-4" v-if="articleItem.cover_url">
            <img class="w-[108px] h-[72px]" :src="articleItem.cover_url" alt="" />
        </div>
    </div>
    <OperateInfo ref="operateInfoRef" content="是否确认删除" @confirmHandle="confirmHandle"></OperateInfo>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { appStore } from '../store/module/app'
import { getTimeAgo } from '../utils'
import OperateInfo from './operateInfo.vue'
import { deleteArticlesRequest } from '@/api/module/articles.js'
const { articleItem } = defineProps({
    articleItem: {
        type: Object,
        default: () => {},
    },
    isUserHomePage: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['refeshHandle'])

const store = appStore()
const userInfo = computed(() => store.userInfo || {})
console.log(articleItem, 'articleItem')
console.log(userInfo, 'userInfo')
const TAG_TYPES = ['primary', 'success', 'warning']
// 常量定义
const router = useRouter()
const clickHandle = article => {
    router.push(`/article/${article.id}`)
}

const goToUserHandle = userId => {
    console.log(userId)
    router.push(`/user/${userId}`)
}

const editHandle = () => {}

const operateInfoRef = ref()
const deleteHandle = () => {
    operateInfoRef.value.open()
}
const confirmHandle = async () => {
    const result = await deleteArticlesRequest({ articleId: articleItem.id })
    console.log('result', result)
    if (result.success) {
        ElMessage.success(result.message)
        emit('refeshHandle')
    } else {
        ElMessage.error(result.message)
    }
}
</script>
<style scoped lang="scss"></style>
