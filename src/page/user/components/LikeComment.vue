<template>
    <div class="likecomment">
        <div v-if="likedCommentList.length">
            <CommentList :commentList="likedCommentList" :articleId="likedCommentList[0].article_id"></CommentList>
        </div>
        <el-empty v-else description="暂无数据" />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getUserLikedCommentsRequest } from '../../../api/module/likes'
import { useRoute } from 'vue-router'
import CommentList from '../../article/components/commentList.vue'

const route = useRoute()
const userId = ref(route.params.id)

const likedCommentList = ref([])
onMounted(async () => {
    const { data } = await getUserLikedCommentsRequest({ userId: userId.value })
    likedCommentList.value = data.comments.map(item => {
        return {
            ...item,
            user: {
                nickname: item.author_nickname,
                avatar_url: item.author_avatar,
            },
        }
    })
    console.log(likedCommentList.value, 'likedCommentList')
})
</script>
<style scoped lang="less">
.likecomment {
    padding: 20px;
}
</style>
