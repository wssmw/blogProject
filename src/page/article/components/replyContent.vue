<template>
    <div class="reply_content">
        <div class="reply_action">
            <div class="time">{{ getTimeAgo(commentItem.created_at) }}</div>
            <div class="digg" @click="diggHandle">
                <img v-if="hasLiked" class="img" src="../../../assets/svg/点赞_1.svg" alt="" />
                <img v-else class="img" src="../../../assets/svg/点赞.svg" alt="" />
                <span>{{ likeCount ? likeCount : '点赞' }}</span>
            </div>
            <div class="comment_on" @click="commentHandle">{{ showTextarea ? '取消回复' : '回复' }}</div>
        </div>
        <div class="textarea" v-if="showTextarea">
            <el-input
                v-model="textarea"
                resize="none"
                type="textarea"
                class="input"
                :autosize="{ minRows: 2, maxRows: 3 }"
                :placeholder="`回复${commentItem.user.nickname}...`"
            >
            </el-input>
            <div class="submit">
                <el-button class="btn" @click="submitCommentHandle">回复</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { createCommentRequest } from '../../../api/module/comment'
import { ElMessage } from 'element-plus'
import { getTimeAgo } from '../../../utils'
import { likeCommentRequest } from '../../../api/module/likes'

const { commentItem, articleId } = defineProps({
    commentItem: {
        type: Object,
    },
    articleId: {
        type: String,
    },
})
console.log(commentItem, 'commentItem')
const textarea = ref()
const showTextarea = ref(false)

// 点赞
const hasLiked = ref(commentItem.has_liked)
const likeCount = ref(commentItem.like_count)
const diggHandle = async () => {
    const results = await likeCommentRequest({ commentId: commentItem.id })
    console.log(results)
    if (results.success) {
        ElMessage.success(results.message)
        hasLiked.value = !hasLiked.value
        likeCount.value = likeCount.value + (hasLiked.value ? 1 : -1)
    }
}
// 评论
const commentHandle = () => {
    showTextarea.value = !showTextarea.value
}

const submitCommentHandle = async () => {
    const result = await createCommentRequest({
        articleId: articleId,
        content: textarea.value,
        parentId: commentItem.id,
    })
    if (result.success) {
        textarea.value = ''
        showTextarea.value = false
        ElMessage.success('回复成功')
    } else {
        textarea.value = ''
        showTextarea.value = false
        ElMessage.error('回复失败')
    }
}
</script>
<style scoped lang="less">
.reply_content {
    .reply_action {
        display: flex;
        .time,
        .digg,
        .comment_on {
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            cursor: pointer;
        }
        .digg {
            margin: 0 16px;
            display: flex;
            align-items: center;
            .img {
                width: 16px;
                height: 16px;
            }
            span {
                margin-left: 4px;
            }
        }
        .comment_on {
            &:hover {
                color: #1e80ff;
            }
        }
    }
    .textarea {
        margin-top: 8px;
        flex-grow: 1;
        position: relative;
        border: 2px solid #f2f3f5;
        border-radius: 4px;
        :deep(.el-textarea__inner) {
            border: none;
            box-shadow: none;
        }
        .input {
            border: none;
        }
        .submit {
            text-align: right;
            .btn {
                margin: 10px 10px 10px 0;
            }
        }
    }
}
</style>
