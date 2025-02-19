<template>
    <div>
        <h1>{{ data?.title }}</h1>
        <AieContent :html="data?.content"></AieContent>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleByIdRequest } from '../../api/module/articles'
import AieContent from './components/aieContent.vue'

const route = useRoute()
let id = computed(() => route.params.id)

let data = ref()
onMounted(async () => {
    console.log(id, 'id')
    const result = await getArticleByIdRequest(id.value)
    console.log(result, 'result')
    data.value = result.data
})
</script>
<style scoped lang="less"></style>
