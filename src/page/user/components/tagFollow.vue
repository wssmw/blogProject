<template>
    <div>
        <div v-if="followTagList.length"></div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getFollowingTagsRequest } from '../../../api/module/follow'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route, 'route')
const followTagList = ref([])
const id = ref(route.params.id)
onMounted(async () => {
    const { data } = await getFollowingTagsRequest({ userId: id.value })
    followTagList.value = data.tags
})
</script>
<style scoped lang="less"></style>
