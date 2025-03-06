<template>
    <div>
        <div v-if="articleList.length">
            <articleItem :isUserHomePage="true" v-for="item in articleList" :key="item.id" :articleItem="item" />
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getUserArticlesRequest } from '@/api/module/articles'
import { useRoute } from 'vue-router'

let articleList = ref([])
const route = useRoute()
const userId = ref(route.params.id)
console.log(userId.value, 'userId')
onMounted(async () => {
    const { data } = await getUserArticlesRequest({ userId: userId.value })
    console.log(data, 'data')
    articleList.value = data.articles
})
</script>
<style scoped lang="scss"></style>
