<template>
    <div>
        <div v-if="articleList.length">
            <template v-for="item in articleList" :key="item.id">
                <articleItem :articleItem="item" />
            </template>
        </div>
        <el-skeleton v-else-if="articleList.length === 0" :rows="5" animated />
        <!-- 加载提示 -->
        <div v-if="loading" class="loading">加载中...</div>
        <div v-if="noMoreData" class="no-more">没有更多数据了</div>
        <div ref="observerTarget"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getArticleRequest } from '@/api/module/articles'
import { useRouter } from 'vue-router'
import articleItem from '@/components/articleItem.vue'
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
