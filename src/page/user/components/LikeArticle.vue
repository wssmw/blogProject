<template>
    <div>
        <div v-if="followUserList.length"></div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getFollowingUsersRequest } from '../../../api/module/follow'

const followUserList = ref([])
onMounted(async () => {
    const { data } = await getFollowingUsersRequest({})
})
</script>
<style scoped lang="less"></style>
