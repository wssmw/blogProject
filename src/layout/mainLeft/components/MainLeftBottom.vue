<template>
    <div class="main_left_bootom bg-white rounded-md p-3">
        <div class="text-base">热门分类</div>
        <el-divider class="divider"></el-divider>
        <div class="content">
            <template v-for="item in categoryList" :key="item.id">
                <div :class="`item ${currentRoutePath.includes(item.id) ? 'active' : ''}`" @click="changeRouter(item)">
                    <div class="w-5 h-5 mr-2" v-html="item.svg_icon"></div>
                    {{ item.name }}
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategoryListRequest } from '../../../api/module/category'
const router = useRouter()
const route = useRoute()

const categoryList = ref([])
onMounted(async () => {
    const result = await getCategoryListRequest()
    console.log(result, 'result')
    categoryList.value = result.data.categories
})

console.log(route, 'route')
const currentRoutePath = computed(() => route.path)

const changeRouter = item => {
    router.replace({ path: `/${item.id}` })
}
</script>
<style scoped lang="less">
.main_left_bootom {
    .divider {
        margin: 10px 0;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        .item {
            display: flex;
            align-items: center;
            width: 140px;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background: #f7f8fa;
                color: #1e80ff;
            }
        }
    }
}
.active {
    background-color: #eaf2ff !important;
    color: #1e80ff;
}
</style>
