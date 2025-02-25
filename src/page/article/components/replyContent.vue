<template>
    <div class="reply_content">
        <div class="reply_action">
            <div class="time">{{ getTimeAgo(commentItem.created_at) }}</div>
            <div class="digg">320</div>
            <div class="comment_on" @click="commentHandle">回复</div>
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

const commentHandle = () => {
    console.log(commentItem, 'commentItem')

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
