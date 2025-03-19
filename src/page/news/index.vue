<script setup>
import { ref } from 'vue'
import Comment from './components/comment.vue'
import Follow from './components/follow.vue'
import Like from './components/like.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route, 'route')
const activeName = ref(route.query.type || 'comment')
</script>
<template>
    <div class="news">
        <el-tabs v-model="activeName" class="tabs" tab-position="left">
            <el-tab-pane label="评论" name="comment">
                <Comment></Comment>
            </el-tab-pane>
            <el-tab-pane label="点赞" name="like" lazy>
                <Like></Like>
            </el-tab-pane>
            <el-tab-pane label="关注" name="follow" lazy>
                <Follow></Follow>
            </el-tab-pane>
            <el-tab-pane label="私信" name="privateMessage" lazy>
                <el-empty description="功能待开发">
                    <template #image>
                        <el-icon size="40"><Warning /></el-icon>
                    </template>
                </el-empty>
            </el-tab-pane>
            <el-tab-pane label="系统消息" name="systemMessage" lazy>
                <el-empty description="功能待开发">
                    <template #image>
                        <el-icon size="40"><Warning /></el-icon>
                    </template>
                </el-empty>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="less" scoped>
.news {
    width: 1260px;
    display: flex;
    margin-top: 20px;
    padding-bottom: 20px;
    .tabs {
        width: 100%;
    }
}
</style>
