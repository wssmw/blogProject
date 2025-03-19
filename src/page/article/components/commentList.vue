<template>
    <div class="commentlist">
        <template v-for="item in commentList" :key="item.id">
            <div class="main_comment">
                <div class="left_avatar">
                    <img class="img" :src="item.user?.avatar_url" alt="" />
                </div>
                <div class="right_content">
                    <div class="nickname">
                        {{ item.user?.nickname }}
                    </div>
                    <div class="comment_content">
                        {{ item.content }}
                    </div>
                    <ReplyContent :commentItem="item" :articleId="articleId"></ReplyContent>
                    <div class="sec_comment" v-if="item.replies">
                        <template v-for="secItem in item.replies" :key="secItem.id">
                            <div class="sec_comment_box">
                                <div class="sec_left">
                                    <img :src="secItem.user.avatar_url" alt="" />
                                </div>
                                <div class="sec_right">
                                    <div class="sec_content">
                                        <div class="nickname">
                                            <span class="myself">
                                                {{ secItem.user.nickname }}
                                            </span>
                                            <span v-if="secItem.parent_id !== item.id">回复</span>
                                            <span class="reply_to" v-if="secItem.parent_id !== item.id">
                                                {{ secItem.reply_to.nickname }}
                                            </span>
                                            :
                                        </div>
                                        <div class="comment_content">
                                            {{ secItem.content }}
                                        </div>
                                    </div>
                                    <ReplyContent :commentItem="secItem" :articleId="articleId"></ReplyContent>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import ReplyContent from './replyContent.vue'

const { commentList } = defineProps({
    commentList: {
        type: Object,
    },
    articleId: {
        type: String,
    },
})
</script>
<style scoped lang="less">
.commentlist {
    .main_comment {
        display: flex;
        margin-bottom: 20px;
        .left_avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            .img {
                width: 36px;
                height: 36px;
            }
        }
        .right_content {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 12px;
            .nickname {
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
            }
            .comment_content {
                font-size: 16px;
                font-weight: 400;
                line-height: 28px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .reply_action {
                display: flex;
            }
            .sec_comment {
                display: flex;
                flex-direction: column;
                margin-top: 12px;
                .sec_comment_box {
                    display: flex;
                    margin-bottom: 12px;
                    .sec_left {
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        overflow: hidden;
                        .img {
                            width: 28px;
                            height: 28px;
                        }
                    }
                    .sec_right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        margin-left: 8px;
                        .sec_content {
                            .nickname {
                                display: inline;
                            }
                            .comment_content {
                                display: inline;
                            }
                        }
                        .reply_action {
                            display: flex;
                        }
                    }
                }
            }
        }
    }
}
</style>
