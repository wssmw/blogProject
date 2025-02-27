<template>
    <div class="article_left">
        <el-badge
            :value="likeCount"
            class="item"
            :offset="[-5, 5]"
            :color="hasLiked ? '#1e80ff' : '#c2c8d1'"
            :hidden="!likeCount"
        >
            <img v-if="hasLiked" @click="likeHandle" class="img" src="@/assets/svg/点赞_1.svg" alt="" />
            <img v-else @click="likeHandle" class="img" src="@/assets/svg/点赞.svg" alt="" />
        </el-badge>
        <el-badge
            :value="data?.comment_count"
            class="item"
            :offset="[-5, 5]"
            color="#c2c8d1"
            :hidden="!data?.comment_count"
        >
            <el-icon size="20"><ChatDotRound /></el-icon>
        </el-badge>
        <el-badge
            :value="12"
            class="item"
            :offset="[-5, 5]"
            :color="data?.has_liked ? '#1e80ff' : '#c2c8d1'"
            :hidden="!data?.comment_count"
        >
            <el-icon size="20"><Star /></el-icon>
        </el-badge>
        <div class="item">
            <el-icon size="20"><Share /></el-icon>
        </div>
        <div class="item">
            <el-icon size="20"><WarnTriangleFilled /></el-icon>
        </div>
    </div>
    
    <!-- 登录弹窗组件 -->
    <el-dialog
        v-model="loginDialogVisible"
        title="登录"
        width="400px"
        :show-close="true"
        @close="closeLoginDialog"
    >
        <!-- 这里放登录表单组件 -->
        <login-form @success="closeLoginDialog" />
    </el-dialog>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { likeArticleRequest } from '../../../api/module/likes'
import { ElMessage } from 'element-plus'
import { useLogin } from '@/hooks/useLogin'

const { data } = defineProps({
    data: {
        type: Object,
        required: true
    },
})

const localData = ref({ ...data })
const likeCount = computed(() => localData.value.like_count)
const hasLiked = computed(() => !!localData.value.has_liked)

// 使用登录hooks
const { withLogin } = useLogin()

const likeHandle = async () => {
    withLogin(async () => {
        const result = await likeArticleRequest({ articleId: data.id })
        if (result.success) {
            ElMessage.success(result.message)
            localData.value = {
                ...localData.value,
                has_liked: !localData.value.has_liked,
                like_count: localData.value.like_count + (localData.value.has_liked ? -1 : 1)
            }
        }
    })
}

// 监听父组件数据变化
watch(() => data, (newData) => {
    localData.value = { ...newData }
}, { deep: true })
</script>
<style scoped lang="less">
.article_left {
    position: fixed;
    margin-top: 40px;
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.04);
        cursor: pointer;
        .img {
            width: 20px;
            height: 20px;
        }
    }
}
</style>

