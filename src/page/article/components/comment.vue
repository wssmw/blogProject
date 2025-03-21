<template>
    <div class="comment">
        <div class="title">评论{{ 123 }}</div>
        <div class="create_comment">
            <div class="avatar">
                <img class="img" v-if="store.isLogin" :src="userInfo.avatar_url" alt="" />
                <el-icon size="40" v-else><UserFilled /></el-icon>
            </div>
            <div class="textarea" v-if="store.isLogin">
                <el-input
                    v-model="textarea"
                    resize="none"
                    type="textarea"
                    class="input"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    placeholder="请输入内容..."
                >
                </el-input>
                <div class="submit">
                    <el-button class="btn" @click="commentHandle">评论</el-button>
                </div>
            </div>
            <div class="noLogin_textarea" v-else>
                <el-button class="btn" @click="loginHandle">登录/注册</el-button>
                <span>登录之后即可评论~</span>
            </div>
        </div>
        <CommentList :commentList="commentList" :articleId="props.articleId"></CommentList>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { appStore } from '../../../store/module/app'
import { createCommentRequest, getCommentListRequest } from '../../../api/module/comment'
import { ElMessage } from 'element-plus'
import CommentList from './commentList.vue'
const props = defineProps(['articleId'])
const store = appStore()
const userInfo = computed(() => store.userInfo)

const commentList = ref()
onMounted(async () => {
    const result = await getCommentListRequest({ articleId: props.articleId })
    console.log(result)
    commentList.value = result.data.comments
})

const textarea = ref()
const commentHandle = async () => {
    const result = await createCommentRequest({
        articleId: props.articleId,
        content: textarea.value,
    })
    if (result.success) {
        ElMessage.success('评论成功')
    } else {
        ElMessage.error('评论失败')
    }
}
const loginHandle = () => {
    store.showLoginModalChange(true)
}
</script>
<style scoped lang="less">
.comment {
    margin-top: 16px;
    background: white;
    border-radius: 6px;
    padding: 20px;
    .title {
        font-size: 18px;
        font-weight: 600;
        color: black;
        margin-bottom: 16px;
    }
    .create_comment {
        display: flex;
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 16px;
            .img {
                width: 40px;
                height: 40px;
            }
            .el-icon {
                width: 100%;
                height: 100%;
            }
        }
        .textarea {
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
        .noLogin_textarea {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f2f3f5;
            border-radius: 4px;
            .btn {
                margin: 40px 0;
            }
            span {
                margin-left: 20px;
            }
        }
    }
    .commentlist {
        margin-top: 20px;
    }
}
</style>
