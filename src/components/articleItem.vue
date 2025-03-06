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
                    <div v-else class="max-w-[132px] text-nowrap text-ellipsis overflow-hidden mr-1">{{
                        articleItem.author_name
                    }}</div>
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
</template>
<script setup>
import { useRouter } from 'vue-router'
import { getTimeAgo } from '../utils'
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
const TAG_TYPES = ['primary', 'success', 'warning']
// 常量定义
const router = useRouter()
const clickHandle = article => {
    router.push(`/article/${article.id}`)
}
</script>
<style scoped lang="scss"></style>
