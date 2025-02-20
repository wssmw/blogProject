<template>
    <div class="comment">
        <div class="title">评论{{ 123 }}</div>
        <div class="create_comment">
            <div class="avatar">
                <img :src="userInfo.avatar_url" alt="" />
            </div>
            <div class="textarea">
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
                    <el-button @click="commentHandle">评论</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { appStore } from '../../../store/module/app'

const store = appStore()
const userInfo = computed(() => store.userInfo)
const textarea = ref()

const commentHandle = () => {}
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
        }
        .textarea {
            flex-grow: 1;
            position: relative;
            // border: 1px solid black;
            .input {
                border: none;
            }
            .submit {
            }
        }
    }
}
</style>
