<template>
    <div>
        <div v-html="html" class="aie-content"></div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleByIdRequest } from '../../api/module/articles'

const route = useRoute()
let id = computed(() => route.params.id)

const html = ref()
onMounted(async () => {
    console.log(id, 'id')
    const result = await getArticleByIdRequest(id.value)
    console.log(result, 'result')
    html.value = result.data.content
})
</script>
<style scoped lang="less"></style>
