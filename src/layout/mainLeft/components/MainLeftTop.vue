<template>
    <div class="main_left_top bg-bgSec rounded-md">
        <template v-for="item in data" :key="item.key">
            <div
                :class="`item ${currentRoutePath == `${item.router}` ? 'active' : ''}`"
                @click="changeRouter(item.router)"
            >
                {{ item.label }}
            </div>
        </template>
    </div>
</template>
<script setup>
let data = [
    {
        label: '关注',
        router: '/attention-article',
        key: 'attention-article',
    },
    {
        label: '综合',
        router: '/',
        key: '/',
    },
    {
        label: '最新',
        router: '/last-article',
        key: 'last-article',
    },
]
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
console.log(route)
const currentRoutePath = computed(() => route.path)
const changeRouter = route => {
    router.push(route)
}
</script>
<style scoped lang="less">
.main_left_top {
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
    .item {
        width: 140px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
            background: var(--theme-highlight-bg);
            color: var(--theme-primary-color);
        }
    }
}
.active {
    background-color: var(--theme-highlight-bg) !important;
    color: var(--theme-primary-color);
}
</style>
