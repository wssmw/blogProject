<template>
    <div class="likearticle">
        <div v-if="likedArticleList.length">
            <template v-for="item in likedArticleList" :key="item.id">
                <ArticleItem :articleItem="item"></ArticleItem>
            </template>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import ArticleItem from '../../../components/articleItem.vue'
import { getUserLikedArticlesRequest } from '../../../api/module/likes'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = ref(route.params.id)

const likedArticleList = ref([])
onMounted(async () => {
    const { data } = await getUserLikedArticlesRequest({ userId: userId.value })
    console.log(data)
    likedArticleList.value = data.articles
})
</script>
<style scoped lang="less">
.likearticle {
    padding: 20px;
}
</style>
