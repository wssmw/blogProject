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
                                <div class="mx-2">评论{{ item.commentTimes }}</div>
                                <div class="mx-2">赞{{ item.likeTimes }}</div>
                            </div>
                            <div class="flex">
                                <template
                                    v-for="(secItem, secIndex) in item.tags.length > 3
                                        ? item.tags.slice(0, 3)
                                        : item.tags"
                                    :key="secItem"
                                >
                                    <el-tag class="mx-1" :type="tagType[secIndex]">{{ secItem.name }}</el-tag>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="w-[108px] h-[78px] ml-4" v-if="item.picture">
                        <img class="w-[108px] h-[72px]" :src="item.picture" alt="" />
                    </div>
                </div>
            </template>
        </div>
        <el-skeleton v-else :rows="5" animated />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getArticleRequest } from '@/api/module/articles'
import { useRouter } from 'vue-router'
const router = useRouter()
let articleList = ref([])
let tagType = ref(['primary', 'success', 'warning'])
onMounted(async () => {
    const { data } = await getArticleRequest()
    let { total, articles } = data
    articleList.value = articles
})
const clickHandle = e => {
    console.log(e, 'item')
    console.log(e.id, 'item')
    router.push(`/article/${e.id}`)
}
</script>
<style scoped lang="less"></style>
