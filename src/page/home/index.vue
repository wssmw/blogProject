<template>
    <div>
        <div v-if="articleList.length">
            <template v-for="item in articleList" :key="item.id">
                <div
                    class="cursor-pointer flex justify-between items-center w-full h-[100px] border-b border-solid"
                    @click="clickHandle(item)"
                >
                    <div class="flex flex-1 flex-col justify-between h-[78px] overflow-hidden">
                        <div class="text-lg font-medium text-ellipsis overflow-hidden whitespace-nowrap">{{
                            item.title
                        }}</div>
                        <div class="text-ellipsis overflow-hidden whitespace-nowrap">{{ item.summary }}</div>
                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <div class="max-w-[132px] text-nowrap text-ellipsis overflow-hidden mr-1">{{
                                    item.author_name
                                }}</div>
                                <el-divider direction="vertical"></el-divider>
                                <div class="mx-2">查看{{ item.viewTimes }}</div>
                                <div class="mx-2 flex items-center"
                                    ><el-icon size="16" class="mr-1"><ChatDotRound /></el-icon
                                    >{{ item.comment_count }}</div
                                >
                                <div class="mx-2 flex">
                                    <img
                                        v-if="item.has_liked"
                                        class="img w-[16px]"
                                        src="../../assets/svg/点赞_1.svg"
                                        alt=""
                                    />
                                    <img v-else class="img w-[16px]" src="../../assets/svg/点赞.svg" alt="" />
                                    <span class="ml-1">
                                        {{ item.like_count }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex">
                                <template
                                    v-for="(secItem, secIndex) in item.tags.length > 3
                                        ? item.tags.slice(0, 3)
                                        : item.tags"
                                    :key="secItem"
                                >
                                    <el-tag class="mx-1" :type="TAG_TYPES[secIndex]">{{ secItem.name }}</el-tag>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="w-[108px] h-[78px] ml-4" v-if="item.cover_url">
                        <img class="w-[108px] h-[72px]" :src="item.cover_url" alt="" />
                    </div>
                </div>
            </template>
        </div>
        <el-skeleton v-else-if="articleList.length === 0" :rows="5" animated />
        <!-- 加载提示 -->
        <div v-if="loading" class="loading">加载中...</div>
        <div v-if="noMoreData" class="no-more">没有更多数据了</div>
        <div ref="observerTarget"></div>
        <el-backtop :right="100" :bottom="50" />
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getArticleRequest } from '@/api/module/articles'
import { useRouter } from 'vue-router'

// 常量定义
const router = useRouter()
const TAG_TYPES = ['primary', 'success', 'warning']
const PAGE_SIZE = 10
const OBSERVER_OPTIONS = {
    root: null,
    rootMargin: '200px',
    threshold: 0.1,
}

// 响应式数据
const articleList = ref([])
const page = ref(0)
const observerTarget = ref()
const loading = ref(false)
const noMoreData = ref(false)

let observer
let debounceTimer = null // 用于防抖的timer

onMounted(() => {
    observer = new IntersectionObserver(entries => {
        const target = entries[0]
        if (target.isIntersecting && !loading.value && !noMoreData.value) {
            clearTimeout(debounceTimer) // 清除之前的定时器
            debounceTimer = setTimeout(() => {
                requestHandle()
            }, 200)
        }
    }, OBSERVER_OPTIONS)

    if (observerTarget.value) {
        observer.observe(observerTarget.value)
    }
})

const requestHandle = async () => {
    loading.value = true
    const { data } = await getArticleRequest({
        page: page.value,
        pageSize: PAGE_SIZE,
    })
    const { total, articles } = data
    articleList.value = [...articleList.value, ...articles]
    page.value = page.value + 1
    loading.value = false
    if (page.value * PAGE_SIZE > total) {
        noMoreData.value = true
    }
}

const clickHandle = article => {
    router.push(`/article/${article.id}`)
}

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
    clearTimeout(debounceTimer) // 清理定时器
})
</script>
<style scoped lang="less">
/* 没有更多数据样式 */
.no-more {
    text-align: center;
    padding: 20px;
    color: #999;
    font-size: 14px;
    position: relative;
}

.no-more::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #eee;
    z-index: -1;
}
</style>
