<template>
    <div>
        <articleItem v-for="item in articleList" :key="item.id" :articleItem="item" />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getUserArticlesRequest } from '@/api/module/articles'

let articleList = ref([])
onMounted(async () => {
    const { data } = await getUserArticlesRequest()
    console.log(data, 'data')
    articleList.value = data.articles
})
</script>
<style scoped lang="scss"></style>
